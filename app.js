/**
 * JD PDF Editor - V2 con Menús estilo Google, Dibujo Vectorial y Vista Previa
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const AppState = {
  pdfBytes: null,
  pdfDoc: null,
  fileName: "Documento sin título.pdf",
  totalPages: 0,
  currentPageIndex: 0,
  zoomScale: 1.25,
  activeTool: 'select', // 'select' | 'new-text' | 'draw' | 'rect' | 'circle'
  selectedBox: null,
  pageBoxes: {},
  pageShapes: {}, // { [pageIndex]: Array<{ type, x, y, w, h, points, color, thickness }> }
  pageViewports: []
};

const DOM = {
  filePicker: document.getElementById('filePicker'),
  documentNameInput: document.getElementById('documentNameInput'),
  saveStatus: document.getElementById('saveStatus'),
  
  // Toolbar buttons
  toolSelect: document.getElementById('toolSelect'),
  toolNewText: document.getElementById('toolNewText'),
  toolDraw: document.getElementById('toolDraw'),
  toolRect: document.getElementById('toolRect'),
  toolCircle: document.getElementById('toolCircle'),
  lineWeightInput: document.getElementById('lineWeightInput'),
  btnLineWeightDec: document.getElementById('btnLineWeightDec'),
  btnLineWeightInc: document.getElementById('btnLineWeightInc'),
  
  fontSelect: document.getElementById('fontSelect'),
  fontSizeInput: document.getElementById('fontSizeInput'),
  btnFontSizeDec: document.getElementById('btnFontSizeDec'),
  btnFontSizeInc: document.getElementById('btnFontSizeInc'),
  btnFormatBold: document.getElementById('btnFormatBold'),
  btnFormatItalic: document.getElementById('btnFormatItalic'),
  btnFormatUnderline: document.getElementById('btnFormatUnderline'),
  textColorPicker: document.getElementById('textColorPicker'),
  textColorIndicator: document.getElementById('textColorIndicator'),
  bgMaskColorPicker: document.getElementById('bgMaskColorPicker'),
  bgColorIndicator: document.getElementById('bgColorIndicator'),
  btnAlignLeft: document.getElementById('btnAlignLeft'),
  btnAlignCenter: document.getElementById('btnAlignCenter'),
  btnAlignRight: document.getElementById('btnAlignRight'),
  btnMaskExisting: document.getElementById('btnMaskExisting'),
  btnDeleteBox: document.getElementById('btnDeleteBox'),
  btnZoomOut: document.getElementById('btnZoomOut'),
  btnZoomIn: document.getElementById('btnZoomIn'),
  btnZoomFit: document.getElementById('btnZoomFit'),
  zoomLevelLabel: document.getElementById('zoomLevelLabel'),

  // Export / Preview
  btnPreview: document.getElementById('btnPreview'),
  btnQuickExport: document.getElementById('btnQuickExport'),

  documentPagesScroller: document.getElementById('documentPagesScroller'),
  thumbnailsList: document.getElementById('thumbnailsList'),
  emptyPlaceholder: document.getElementById('emptyPlaceholder'),
  btnEmptyUpload: document.getElementById('btnEmptyUpload'),
  btnEmptySample: document.getElementById('btnEmptySample'),
  
  appSnackbar: document.getElementById('appSnackbar'),
  snackbarText: document.getElementById('snackbarText'),
  snackbarDismiss: document.getElementById('snackbarDismiss'),
  ocrModal: document.getElementById('ocrModal'),
  ocrProgressFill: document.getElementById('ocrProgressFill'),
  ocrProgressStatus: document.getElementById('ocrProgressStatus')
};

function init() {
  setupMenus();
  setupHeaderEvents();
  setupToolbarEvents();
  setupKeyboardShortcuts();
  setupSnackbar();
}

function showSnackbar(message, duration = 3500) {
  DOM.snackbarText.textContent = message;
  DOM.appSnackbar.classList.add('show');
  setTimeout(() => DOM.appSnackbar.classList.remove('show'), duration);
}
function setupSnackbar() { DOM.snackbarDismiss.addEventListener('click', () => DOM.appSnackbar.classList.remove('show')); }

function setupMenus() {
  // Manejo de despliegue de menús
  document.querySelectorAll('.menu-text-btn[data-menu]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-menu');
      const targetMenu = document.getElementById(targetId);
      document.querySelectorAll('.g-dropdown').forEach(m => {
        if (m !== targetMenu) m.classList.remove('show');
      });
      targetMenu.classList.toggle('show');
    });
  });
  
  document.addEventListener('click', () => {
    document.querySelectorAll('.g-dropdown').forEach(m => m.classList.remove('show'));
  });

  // Asignar funciones a los items del menú
  document.getElementById('btnOpenPdfDrop').addEventListener('click', () => DOM.filePicker.click());
  document.getElementById('btnSampleDocDrop').addEventListener('click', loadSampleInvoice);
  document.getElementById('btnExportPdfDrop').addEventListener('click', exportModifiedPdf);
  
  document.getElementById('btnDeleteActiveMenu').addEventListener('click', () => {
    if (AppState.selectedBox) deleteBox(AppState.selectedBox);
    else showSnackbar("Ningún texto seleccionado");
  });
  document.getElementById('btnUndoShapeMenu').addEventListener('click', () => {
    const shapes = AppState.pageShapes[AppState.currentPageIndex];
    if (shapes && shapes.length > 0) {
      shapes.pop();
      renderPageShapes(AppState.currentPageIndex);
      showSnackbar("Dibujo deshecho");
    } else {
      showSnackbar("No hay dibujos para deshacer en esta página");
    }
  });

  document.getElementById('btnZoomInMenu').addEventListener('click', () => changeZoom(0.15));
  document.getElementById('btnZoomOutMenu').addEventListener('click', () => changeZoom(-0.15));
  document.getElementById('btnZoomFitMenu').addEventListener('click', () => { AppState.zoomScale = 1.0; DOM.zoomLevelLabel.textContent = "100%"; renderAllPages(); });

  document.getElementById('btnNewTextMenu').addEventListener('click', () => setToolMode('new-text'));
  document.getElementById('btnDetectNativeDrop').addEventListener('click', () => autoDetectExistingText(AppState.currentPageIndex));
  document.getElementById('btnTriggerOcrDrop').addEventListener('click', () => runOcrOnCurrentPage(AppState.currentPageIndex));

  document.getElementById('btnBoldMenu').addEventListener('click', () => DOM.btnFormatBold.click());
  document.getElementById('btnItalicMenu').addEventListener('click', () => DOM.btnFormatItalic.click());
  document.getElementById('btnUnderlineMenu').addEventListener('click', () => DOM.btnFormatUnderline.click());
}

function setupHeaderEvents() {
  DOM.filePicker.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    AppState.fileName = file.name.replace(/\.pdf$/i, '');
    DOM.documentNameInput.value = AppState.fileName;
    await loadPdfFromBuffer(new Uint8Array(arrayBuffer));
  });
  DOM.btnEmptyUpload.addEventListener('click', () => DOM.filePicker.click());
  DOM.btnEmptySample.addEventListener('click', loadSampleInvoice);

  DOM.btnPreview.addEventListener('click', previewPdf);
  DOM.btnQuickExport.addEventListener('click', exportModifiedPdf);
}

function setupToolbarEvents() {
  DOM.toolSelect.addEventListener('click', () => setToolMode('select'));
  DOM.toolNewText.addEventListener('click', () => setToolMode('new-text'));
  DOM.toolDraw.addEventListener('click', () => setToolMode('draw'));
  DOM.toolRect.addEventListener('click', () => setToolMode('rect'));
  DOM.toolCircle.addEventListener('click', () => setToolMode('circle'));

  DOM.btnLineWeightDec.addEventListener('click', () => { DOM.lineWeightInput.value = Math.max(1, parseInt(DOM.lineWeightInput.value)-1); });
  DOM.btnLineWeightInc.addEventListener('click', () => { DOM.lineWeightInput.value = Math.min(20, parseInt(DOM.lineWeightInput.value)+1); });

  DOM.fontSelect.addEventListener('change', (e) => { if(AppState.selectedBox) { AppState.selectedBox.fontFamily = e.target.value; updateBoxDOM(AppState.selectedBox); }});
  DOM.fontSizeInput.addEventListener('change', (e) => { if(AppState.selectedBox) { AppState.selectedBox.fontSize = parseInt(e.target.value)||14; updateBoxDOM(AppState.selectedBox); }});
  DOM.btnFontSizeDec.addEventListener('click', () => { let val = Math.max(6, (parseInt(DOM.fontSizeInput.value)||14)-1); DOM.fontSizeInput.value=val; if(AppState.selectedBox) { AppState.selectedBox.fontSize=val; updateBoxDOM(AppState.selectedBox); }});
  DOM.btnFontSizeInc.addEventListener('click', () => { let val = Math.min(144, (parseInt(DOM.fontSizeInput.value)||14)+1); DOM.fontSizeInput.value=val; if(AppState.selectedBox) { AppState.selectedBox.fontSize=val; updateBoxDOM(AppState.selectedBox); }});
  DOM.btnFormatBold.addEventListener('click', () => { if(AppState.selectedBox) { AppState.selectedBox.isBold = !AppState.selectedBox.isBold; DOM.btnFormatBold.classList.toggle('active', AppState.selectedBox.isBold); updateBoxDOM(AppState.selectedBox); }});
  DOM.btnFormatItalic.addEventListener('click', () => { if(AppState.selectedBox) { AppState.selectedBox.isItalic = !AppState.selectedBox.isItalic; DOM.btnFormatItalic.classList.toggle('active', AppState.selectedBox.isItalic); updateBoxDOM(AppState.selectedBox); }});
  DOM.btnFormatUnderline.addEventListener('click', () => { if(AppState.selectedBox) { AppState.selectedBox.isUnderline = !AppState.selectedBox.isUnderline; DOM.btnFormatUnderline.classList.toggle('active', AppState.selectedBox.isUnderline); updateBoxDOM(AppState.selectedBox); }});
  DOM.textColorPicker.addEventListener('input', (e) => { DOM.textColorIndicator.style.background = e.target.value; if(AppState.selectedBox) { AppState.selectedBox.color = e.target.value; updateBoxDOM(AppState.selectedBox); }});
  DOM.bgMaskColorPicker.addEventListener('input', (e) => { DOM.bgColorIndicator.style.background = e.target.value; if(AppState.selectedBox) { AppState.selectedBox.backgroundColor = e.target.value; updateBoxDOM(AppState.selectedBox); }});
  const setAlignment = (align) => { if(AppState.selectedBox) { AppState.selectedBox.textAlign = align; DOM.btnAlignLeft.classList.toggle('active', align==='left'); DOM.btnAlignCenter.classList.toggle('active', align==='center'); DOM.btnAlignRight.classList.toggle('active', align==='right'); updateBoxDOM(AppState.selectedBox); }};
  DOM.btnAlignLeft.addEventListener('click', () => setAlignment('left'));
  DOM.btnAlignCenter.addEventListener('click', () => setAlignment('center'));
  DOM.btnAlignRight.addEventListener('click', () => setAlignment('right'));
  DOM.btnMaskExisting.addEventListener('click', () => { if(AppState.selectedBox) { AppState.selectedBox.masked = !AppState.selectedBox.masked; DOM.btnMaskExisting.classList.toggle('active', AppState.selectedBox.masked); updateBoxDOM(AppState.selectedBox); }});
  DOM.btnDeleteBox.addEventListener('click', () => { if(AppState.selectedBox) deleteBox(AppState.selectedBox); });
  DOM.btnZoomIn.addEventListener('click', () => changeZoom(0.15));
  DOM.btnZoomOut.addEventListener('click', () => changeZoom(-0.15));
  DOM.btnZoomFit.addEventListener('click', () => { AppState.zoomScale = 1.0; DOM.zoomLevelLabel.textContent = "100%"; renderAllPages(); });
}

function setToolMode(mode) {
  AppState.activeTool = mode;
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
  if (mode === 'select') DOM.toolSelect.classList.add('active');
  else if (mode === 'new-text') DOM.toolNewText.classList.add('active');
  else if (mode === 'draw') DOM.toolDraw.classList.add('active');
  else if (mode === 'rect') DOM.toolRect.classList.add('active');
  else if (mode === 'circle') DOM.toolCircle.classList.add('active');
}

function changeZoom(delta) {
  const newScale = Math.max(0.5, Math.min(2.5, AppState.zoomScale + delta));
  if (newScale !== AppState.zoomScale) {
    AppState.zoomScale = newScale;
    DOM.zoomLevelLabel.textContent = `${Math.round(newScale * 100)}%`;
    renderAllPages();
  }
}

function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (AppState.selectedBox) deleteBox(AppState.selectedBox);
    } else if (e.key === 'v' || e.key === 'V') setToolMode('select');
    else if (e.key === 't' || e.key === 'T') setToolMode('new-text');
  });
}

async function loadPdfFromBuffer(bytes) {
  AppState.pdfBytes = bytes;
  const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
  AppState.pdfDoc = await loadingTask.promise;
  AppState.totalPages = AppState.pdfDoc.numPages;
  AppState.currentPageIndex = 0;
  AppState.pageBoxes = {};
  AppState.pageShapes = {};
  if (DOM.emptyPlaceholder) DOM.emptyPlaceholder.style.display = 'none';
  renderThumbnails();
  await renderAllPages();
  showSnackbar(`PDF cargado con éxito (${AppState.totalPages} páginas)`);
}

async function renderThumbnails() {
  DOM.thumbnailsList.innerHTML = '';
  for (let i = 1; i <= AppState.totalPages; i++) {
    const page = await AppState.pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 0.2 });
    const card = document.createElement('div');
    card.className = `page-thumb-card ${i === 1 ? 'active' : ''}`;
    const previewWrap = document.createElement('div');
    previewWrap.className = 'thumb-preview-wrapper';
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const label = document.createElement('span');
    label.className = 'page-thumb-num'; label.textContent = `Página ${i}`;
    previewWrap.appendChild(canvas); card.appendChild(previewWrap); card.appendChild(label);
    card.addEventListener('click', () => {
      document.querySelectorAll('.page-thumb-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      AppState.currentPageIndex = i - 1;
      document.getElementById(`page-wrapper-${i - 1}`)?.scrollIntoView({ behavior: 'smooth' });
    });
    DOM.thumbnailsList.appendChild(card);
  }
}

async function renderAllPages() {
  DOM.documentPagesScroller.innerHTML = '';
  AppState.pageViewports = [];

  for (let i = 1; i <= AppState.totalPages; i++) {
    const pageIndex = i - 1;
    const page = await AppState.pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: AppState.zoomScale });
    AppState.pageViewports[pageIndex] = viewport;

    const pageContainer = document.createElement('div');
    pageContainer.className = 'pdf-page-container';
    pageContainer.id = `page-wrapper-${pageIndex}`;
    pageContainer.style.width = `${viewport.width}px`;
    pageContainer.style.height = `${viewport.height}px`;

    const canvas = document.createElement('canvas');
    canvas.className = 'pdf-page-canvas';
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

    // Capa SVG para dibujos vectoriales
    const svgOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOverlay.setAttribute("class", "drawing-overlay");
    svgOverlay.id = `svg-overlay-${pageIndex}`;

    // Capa interactiva para eventos
    const overlay = document.createElement('div');
    overlay.className = 'text-boxes-overlay';
    overlay.id = `overlay-page-${pageIndex}`;
    overlay.dataset.pageIndex = pageIndex;

    overlay.addEventListener('mousedown', (e) => {
      if (AppState.activeTool === 'select' && e.target === overlay) {
        deselectAllBoxes();
      } else if (AppState.activeTool === 'new-text') {
        const rect = overlay.getBoundingClientRect();
        createNewTextBox(pageIndex, (e.clientX - rect.left)/AppState.zoomScale, (e.clientY - rect.top)/AppState.zoomScale, "Escribe aquí...", 14);
        setToolMode('select');
      } else if (['draw', 'rect', 'circle'].includes(AppState.activeTool)) {
        startDrawing(e, overlay, pageIndex);
      }
    });

    pageContainer.appendChild(canvas);
    pageContainer.appendChild(svgOverlay);
    pageContainer.appendChild(overlay);
    DOM.documentPagesScroller.appendChild(pageContainer);

    renderPageBoxes(pageIndex);
    renderPageShapes(pageIndex);
  }
}

/* --- LÓGICA DE DIBUJO GEOMÉTRICO Y LIBRE --- */
function startDrawing(e, overlay, pageIndex) {
  const rect = overlay.getBoundingClientRect();
  const startX = (e.clientX - rect.left) / AppState.zoomScale;
  const startY = (e.clientY - rect.top) / AppState.zoomScale;
  
  if (!AppState.pageShapes[pageIndex]) AppState.pageShapes[pageIndex] = [];
  
  const shape = {
     id: 'shape_' + Math.random().toString(36).substr(2, 9),
     type: AppState.activeTool,
     x: startX, y: startY, w: 0, h: 0,
     points: [{x: startX, y: startY}],
     color: DOM.textColorPicker.value,
     thickness: parseInt(DOM.lineWeightInput.value) || 2
  };
  
  AppState.pageShapes[pageIndex].push(shape);
  const svgLayer = document.getElementById(`svg-overlay-${pageIndex}`);
  let svgEl;
  
  if (shape.type === 'draw') {
     svgEl = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
     svgEl.setAttribute("fill", "none");
     svgEl.setAttribute("stroke", shape.color);
     svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
     svgEl.setAttribute("stroke-linecap", "round");
     svgEl.setAttribute("stroke-linejoin", "round");
     svgLayer.appendChild(svgEl);
  } else if (shape.type === 'rect') {
     svgEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
     svgEl.setAttribute("fill", "none");
     svgEl.setAttribute("stroke", shape.color);
     svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
     svgLayer.appendChild(svgEl);
  } else if (shape.type === 'circle') {
     svgEl = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
     svgEl.setAttribute("fill", "none");
     svgEl.setAttribute("stroke", shape.color);
     svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
     svgLayer.appendChild(svgEl);
  }
  
  function onMouseMove(ev) {
     const currX = (ev.clientX - rect.left) / AppState.zoomScale;
     const currY = (ev.clientY - rect.top) / AppState.zoomScale;
     
     if (shape.type === 'draw') {
        shape.points.push({x: currX, y: currY});
        svgEl.setAttribute("points", shape.points.map(p => `${p.x * AppState.zoomScale},${p.y * AppState.zoomScale}`).join(' '));
     } else if (shape.type === 'rect') {
        shape.w = Math.abs(currX - startX); shape.h = Math.abs(currY - startY);
        shape.x = Math.min(startX, currX); shape.y = Math.min(startY, currY);
        svgEl.setAttribute("x", shape.x * AppState.zoomScale);
        svgEl.setAttribute("y", shape.y * AppState.zoomScale);
        svgEl.setAttribute("width", shape.w * AppState.zoomScale);
        svgEl.setAttribute("height", shape.h * AppState.zoomScale);
     } else if (shape.type === 'circle') {
        shape.w = Math.abs(currX - startX); shape.h = Math.abs(currY - startY);
        shape.x = Math.min(startX, currX); shape.y = Math.min(startY, currY);
        svgEl.setAttribute("cx", (shape.x + shape.w/2) * AppState.zoomScale);
        svgEl.setAttribute("cy", (shape.y + shape.h/2) * AppState.zoomScale);
        svgEl.setAttribute("rx", (shape.w/2) * AppState.zoomScale);
        svgEl.setAttribute("ry", (shape.h/2) * AppState.zoomScale);
     }
  }
  function onMouseUp() {
     window.removeEventListener('mousemove', onMouseMove);
     window.removeEventListener('mouseup', onMouseUp);
     renderPageShapes(pageIndex);
  }
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

function renderPageShapes(pageIndex) {
  const svgLayer = document.getElementById(`svg-overlay-${pageIndex}`);
  if (!svgLayer) return;
  svgLayer.innerHTML = '';
  
  const shapes = AppState.pageShapes[pageIndex] || [];
  shapes.forEach(shape => {
     let svgEl;
     if (shape.type === 'draw') {
        svgEl = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        svgEl.setAttribute("fill", "none");
        svgEl.setAttribute("stroke", shape.color);
        svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
        svgEl.setAttribute("stroke-linecap", "round");
        svgEl.setAttribute("stroke-linejoin", "round");
        svgEl.setAttribute("points", shape.points.map(p => `${p.x * AppState.zoomScale},${p.y * AppState.zoomScale}`).join(' '));
     } else if (shape.type === 'rect') {
        svgEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svgEl.setAttribute("fill", "none");
        svgEl.setAttribute("stroke", shape.color);
        svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
        svgEl.setAttribute("x", shape.x * AppState.zoomScale);
        svgEl.setAttribute("y", shape.y * AppState.zoomScale);
        svgEl.setAttribute("width", shape.w * AppState.zoomScale);
        svgEl.setAttribute("height", shape.h * AppState.zoomScale);
     } else if (shape.type === 'circle') {
        svgEl = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        svgEl.setAttribute("fill", "none");
        svgEl.setAttribute("stroke", shape.color);
        svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
        svgEl.setAttribute("cx", (shape.x + shape.w/2) * AppState.zoomScale);
        svgEl.setAttribute("cy", (shape.y + shape.h/2) * AppState.zoomScale);
        svgEl.setAttribute("rx", (shape.w/2) * AppState.zoomScale);
        svgEl.setAttribute("ry", (shape.h/2) * AppState.zoomScale);
     }
     svgLayer.appendChild(svgEl);
  });
}


/* --- LÓGICA DE CAJAS DE TEXTO --- */
function createNewTextBox(pageIndex, x, y, text = "", fontSize = 14, width = 180, height = 28, isMasked = true) {
  if (!AppState.pageBoxes[pageIndex]) AppState.pageBoxes[pageIndex] = [];
  const newBox = { id: 'box_' + Math.random().toString(36).substr(2, 9), pageIndex, x, y, width, height, text, fontSize, fontFamily: "'Roboto', sans-serif", color: '#202124', backgroundColor: '#FFFFFF', isBold: false, isItalic: false, isUnderline: false, textAlign: 'left', masked: isMasked, domElement: null };
  AppState.pageBoxes[pageIndex].push(newBox);
  mountBoxDOM(newBox); selectBox(newBox);
  return newBox;
}

function mountBoxDOM(box) {
  const overlay = document.getElementById(`overlay-page-${box.pageIndex}`);
  if (!overlay) return null;
  const boxEl = document.createElement('div'); boxEl.className = 'editable-text-box'; boxEl.id = box.id;
  const textEl = document.createElement('div'); textEl.className = 'text-content'; textEl.contentEditable = true; textEl.spellcheck = false; textEl.innerText = box.text;
  const handleSE = document.createElement('div'); handleSE.className = 'resize-handle se';
  boxEl.appendChild(textEl); boxEl.appendChild(handleSE); overlay.appendChild(boxEl);
  box.domElement = boxEl; updateBoxDOM(box);

  textEl.addEventListener('input', () => box.text = textEl.innerText);
  textEl.addEventListener('focus', () => selectBox(box));

  boxEl.addEventListener('mousedown', (e) => {
    if (e.target === handleSE) return;
    selectBox(box);
    let startX = e.clientX, startY = e.clientY, initialX = box.x, initialY = box.y;
    function onMouseMove(ev) { box.x = Math.max(0, initialX + (ev.clientX - startX)/AppState.zoomScale); box.y = Math.max(0, initialY + (ev.clientY - startY)/AppState.zoomScale); updateBoxDOM(box); }
    function onMouseUp() { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
  });

  handleSE.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    let startX = e.clientX, startY = e.clientY, initialW = box.width, initialH = box.height;
    function onMouseMove(ev) { box.width = Math.max(40, initialW + (ev.clientX - startX)/AppState.zoomScale); box.height = Math.max(20, initialH + (ev.clientY - startY)/AppState.zoomScale); updateBoxDOM(box); }
    function onMouseUp() { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
  });
  return boxEl;
}

function updateBoxDOM(box) {
  if (!box.domElement) return;
  const el = box.domElement;
  el.style.left = `${box.x * AppState.zoomScale}px`; el.style.top = `${box.y * AppState.zoomScale}px`;
  el.style.width = `${box.width * AppState.zoomScale}px`; el.style.height = `${box.height * AppState.zoomScale}px`;
  if (box.masked) { el.classList.add('masked'); el.style.backgroundColor = box.backgroundColor || '#ffffff'; }
  else { el.classList.remove('masked'); el.style.backgroundColor = 'transparent'; }
  const textEl = el.querySelector('.text-content');
  if (textEl) {
    textEl.style.fontSize = `${box.fontSize * AppState.zoomScale}px`; textEl.style.fontFamily = box.fontFamily;
    textEl.style.color = box.color; textEl.style.fontWeight = box.isBold ? '700' : '400';
    textEl.style.fontStyle = box.isItalic ? 'italic' : 'normal'; textEl.style.textDecoration = box.isUnderline ? 'underline' : 'none';
    textEl.style.textAlign = box.textAlign;
  }
}

function selectBox(box) {
  deselectAllBoxes(); AppState.selectedBox = box;
  if (box.domElement) box.domElement.classList.add('selected');
  DOM.fontSizeInput.value = box.fontSize; DOM.fontSelect.value = box.fontFamily;
  DOM.textColorPicker.value = box.color; DOM.textColorIndicator.style.background = box.color;
  DOM.bgMaskColorPicker.value = box.backgroundColor || '#FFFFFF'; DOM.bgColorIndicator.style.background = box.backgroundColor || '#FFFFFF';
  DOM.btnFormatBold.classList.toggle('active', !!box.isBold); DOM.btnFormatItalic.classList.toggle('active', !!box.isItalic);
  DOM.btnFormatUnderline.classList.toggle('active', !!box.isUnderline); DOM.btnMaskExisting.classList.toggle('active', !!box.masked);
  DOM.btnAlignLeft.classList.toggle('active', box.textAlign === 'left'); DOM.btnAlignCenter.classList.toggle('active', box.textAlign === 'center');
  DOM.btnAlignRight.classList.toggle('active', box.textAlign === 'right');
}

function deselectAllBoxes() { document.querySelectorAll('.editable-text-box').forEach(el => el.classList.remove('selected')); AppState.selectedBox = null; }
function deleteBox(box) {
  if (!box) return;
  if (box.domElement && box.domElement.parentNode) box.domElement.parentNode.removeChild(box.domElement);
  AppState.pageBoxes[box.pageIndex] = (AppState.pageBoxes[box.pageIndex] || []).filter(b => b.id !== box.id);
  AppState.selectedBox = null; showSnackbar("Elemento eliminado");
}
function renderPageBoxes(pageIndex) { (AppState.pageBoxes[pageIndex] || []).forEach(b => mountBoxDOM(b)); }


/* --- OCR Y DETECCIÓN NATIVA --- */
async function autoDetectExistingText(pageIndex) {
  if (!AppState.pdfDoc) return;
  showSnackbar("Detectando texto...");
  const page = await AppState.pdfDoc.getPage(pageIndex + 1);
  const textContent = await page.getTextContent();
  const viewport = page.getViewport({ scale: 1.0 });
  let count = 0;
  textContent.items.forEach(item => {
    if (!item.str.trim()) return;
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    const fontSize = Math.sqrt(tx[0]*tx[0] + tx[1]*tx[1]);
    createNewTextBox(pageIndex, tx[4], tx[5] - fontSize, item.str, Math.round(fontSize), Math.max(item.width, 30), Math.max(fontSize * 1.2, 18), true);
    count++;
  });
  showSnackbar(`Se detectaron ${count} textos listos para modificar`);
}

async function runOcrOnCurrentPage(pageIndex) {
  if (!AppState.pdfDoc) return;
  DOM.ocrModal.classList.add('show'); DOM.ocrProgressFill.style.width = '5%'; DOM.ocrProgressStatus.textContent = "Extrayendo imagen...";
  try {
    const page = await AppState.pdfDoc.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 2.0 });
    const tempCanvas = document.createElement('canvas'); tempCanvas.width = viewport.width; tempCanvas.height = viewport.height;
    await page.render({ canvasContext: tempCanvas.getContext('2d'), viewport }).promise;
    DOM.ocrProgressStatus.textContent = "Analizando caracteres...";
    const worker = await Tesseract.createWorker('spa+eng', 1, { logger: m => { if (m.status === 'recognizing text') { const pct = Math.round(m.progress * 100); DOM.ocrProgressFill.style.width = `${pct}%`; DOM.ocrProgressStatus.textContent = `Reconociendo: ${pct}%`; } }});
    const ret = await worker.recognize(tempCanvas); await worker.terminate();
    DOM.ocrModal.classList.remove('show');
    let count = 0;
    if (ret.data && ret.data.lines) {
      ret.data.lines.forEach(line => {
        if (!line.text.trim()) return;
        const bbox = line.bbox, h = (bbox.y1 - bbox.y0)/2.0;
        createNewTextBox(pageIndex, bbox.x0/2.0, bbox.y0/2.0, line.text.trim(), Math.max(10, Math.round(h*0.75)), (bbox.x1 - bbox.x0)/2.0, h, true);
        count++;
      });
    }
    showSnackbar(`OCR completado: ${count} textos detectados`);
  } catch (err) { console.error(err); DOM.ocrModal.classList.remove('show'); showSnackbar("Error OCR"); }
}

/* --- EXPORTAR Y VISTA PREVIA (CON DIBUJOS) --- */
async function generatePdfBlob() {
  if (!AppState.pdfBytes) throw new Error("No hay documento abierto");
  
  const pdfDoc = await PDFLib.PDFDocument.load(AppState.pdfBytes);
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (let p = 0; p < pages.length; p++) {
    const page = pages[p];
    const pageHeight = page.getHeight();
    
    // 1. Dibujar formas geométricas y trazos (Exportar)
    const shapes = AppState.pageShapes[p] || [];
    for (const shape of shapes) {
       const color = hexToRgbPdf(shape.color);
       if (shape.type === 'draw') {
           // Dibujar trazo libre como segmentos de líneas sucesivas para máxima compatibilidad
           for(let i=0; i < shape.points.length - 1; i++) {
               page.drawLine({
                   start: { x: shape.points[i].x, y: pageHeight - shape.points[i].y },
                   end: { x: shape.points[i+1].x, y: pageHeight - shape.points[i+1].y },
                   color: color,
                   thickness: shape.thickness
               });
           }
       } else if (shape.type === 'rect') {
           page.drawRectangle({
               x: shape.x,
               y: pageHeight - shape.y - shape.h,
               width: shape.w,
               height: shape.h,
               borderColor: color,
               borderWidth: shape.thickness,
               color: undefined
           });
       } else if (shape.type === 'circle') {
           page.drawEllipse({
               x: shape.x + shape.w/2,
               y: pageHeight - shape.y - shape.h/2,
               xScale: shape.w/2,
               yScale: shape.h/2,
               borderColor: color,
               borderWidth: shape.thickness,
               color: undefined
           });
       }
    }

    // 2. Dibujar Cuadros de Texto
    const boxes = AppState.pageBoxes[p] || [];
    for (const box of boxes) {
      if (!box.text.trim() && !box.masked) continue;
      const pdfX = box.x, pdfY = pageHeight - box.y - box.height;
      if (box.masked) page.drawRectangle({ x: pdfX, y: pdfY, width: box.width, height: box.height, color: hexToRgbPdf(box.backgroundColor || '#FFFFFF') });
      if (box.text.trim()) page.drawText(box.text, { x: pdfX + 2, y: pdfY + (box.height * 0.25), size: box.fontSize, font: box.isBold ? fontBold : font, color: hexToRgbPdf(box.color || '#202124'), maxWidth: box.width });
    }
  }

  const modifiedBytes = await pdfDoc.save();
  return new Blob([modifiedBytes], { type: 'application/pdf' });
}

async function exportModifiedPdf() {
  try {
    showSnackbar("Generando archivo...");
    const blob = await generatePdfBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${AppState.fileName || 'documento'}_editado.pdf`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showSnackbar("¡Documento descargado!");
  } catch(e) { showSnackbar("Error al generar PDF"); }
}

async function previewPdf() {
  try {
    showSnackbar("Abriendo vista previa...");
    const blob = await generatePdfBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch(e) { showSnackbar("Abre un PDF primero para previsualizar"); }
}

function hexToRgbPdf(hex) {
  let c = hex.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16); return PDFLib.rgb((num >> 16)/255, ((num >> 8)&255)/255, (num&255)/255);
}

async function loadSampleInvoice() {
  const samplePdf = await PDFLib.PDFDocument.create();
  const page = samplePdf.addPage([595, 842]);
  const font = await samplePdf.embedFont(PDFLib.StandardFonts.Helvetica);
  page.drawText("JD PDF STUDIO", { x: 50, y: 780, size: 18, font, color: PDFLib.rgb(0.1, 0.45, 0.91) });
  page.drawText("Usa el panel de la barra para insertar dibujos o texto.", { x: 50, y: 730, size: 12, font });
  const bytes = await samplePdf.save();
  AppState.fileName = "Factura_Muestra_JD";
  DOM.documentNameInput.value = AppState.fileName;
  await loadPdfFromBuffer(bytes);
}

document.addEventListener('DOMContentLoaded', init);
