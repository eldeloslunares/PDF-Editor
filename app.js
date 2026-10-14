/**
 * JD PDF Editor - Google Docs Edition
 * Arquitectura modular para reemplazo de texto existente, OCR con Tesseract.js
 * y manipulación con PDF-Lib y PDF.js.
 */

// Inicialización de PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const AppState = {
  pdfBytes: null,
  pdfDoc: null,
  fileName: "Documento sin título.pdf",
  totalPages: 0,
  currentPageIndex: 0,
  zoomScale: 1.25,
  activeTool: 'select', // 'select' | 'new-text'
  selectedBox: null,
  // Diccionario de cuadros por índice de página: { [pageIndex: number]: TextBox[] }
  pageBoxes: {},
  pageViewports: []
};

// Referencias del DOM
const DOM = {
  filePicker: document.getElementById('filePicker'),
  btnOpenPdf: document.getElementById('btnOpenPdf'),
  btnQuickExport: document.getElementById('btnQuickExport'),
  btnExportPdf: document.getElementById('btnExportPdf'),
  btnDetectNative: document.getElementById('btnDetectNative'),
  btnTriggerOcr: document.getElementById('btnTriggerOcr'),
  btnSampleDoc: document.getElementById('btnSampleDoc'),
  btnEmptyUpload: document.getElementById('btnEmptyUpload'),
  btnEmptySample: document.getElementById('btnEmptySample'),
  documentNameInput: document.getElementById('documentNameInput'),
  saveStatus: document.getElementById('saveStatus'),
  
  // Toolbar
  toolSelect: document.getElementById('toolSelect'),
  toolNewText: document.getElementById('toolNewText'),
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

  // Área de trabajo
  documentPagesScroller: document.getElementById('documentPagesScroller'),
  thumbnailsList: document.getElementById('thumbnailsList'),
  emptyPlaceholder: document.getElementById('emptyPlaceholder'),
  
  // Modales y avisos
  appSnackbar: document.getElementById('appSnackbar'),
  snackbarText: document.getElementById('snackbarText'),
  snackbarDismiss: document.getElementById('snackbarDismiss'),
  ocrModal: document.getElementById('ocrModal'),
  ocrModalTitle: document.getElementById('ocrModalTitle'),
  ocrProgressFill: document.getElementById('ocrProgressFill'),
  ocrProgressStatus: document.getElementById('ocrProgressStatus')
};

/* ==========================================================================
   Inicialización de Eventos y Manejadores
   ========================================================================== */
function init() {
  setupHeaderEvents();
  setupToolbarEvents();
  setupKeyboardShortcuts();
  setupSnackbar();
}

function showSnackbar(message, duration = 3500) {
  DOM.snackbarText.textContent = message;
  DOM.appSnackbar.classList.add('show');
  setTimeout(() => {
    DOM.appSnackbar.classList.remove('show');
  }, duration);
}

function setupSnackbar() {
  DOM.snackbarDismiss.addEventListener('click', () => {
    DOM.appSnackbar.classList.remove('show');
  });
}

function setupHeaderEvents() {
  const triggerOpen = () => DOM.filePicker.click();
  DOM.btnOpenPdf.addEventListener('click', triggerOpen);
  if (DOM.btnEmptyUpload) DOM.btnEmptyUpload.addEventListener('click', triggerOpen);

  DOM.filePicker.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    AppState.fileName = file.name.replace(/\.pdf$/i, '');
    DOM.documentNameInput.value = AppState.fileName;
    await loadPdfFromBuffer(new Uint8Array(arrayBuffer));
  });

  const runSample = () => loadSampleInvoice();
  DOM.btnSampleDoc.addEventListener('click', runSample);
  if (DOM.btnEmptySample) DOM.btnEmptySample.addEventListener('click', runSample);

  DOM.btnExportPdf.addEventListener('click', exportModifiedPdf);
  DOM.btnQuickExport.addEventListener('click', exportModifiedPdf);
  DOM.btnDetectNative.addEventListener('click', () => autoDetectExistingText(AppState.currentPageIndex));
  DOM.btnTriggerOcr.addEventListener('click', () => runOcrOnCurrentPage(AppState.currentPageIndex));
}

function setupToolbarEvents() {
  DOM.toolSelect.addEventListener('click', () => setToolMode('select'));
  DOM.toolNewText.addEventListener('click', () => setToolMode('new-text'));

  // Formato de texto dinámico
  DOM.fontSelect.addEventListener('change', (e) => {
    if (AppState.selectedBox) {
      AppState.selectedBox.fontFamily = e.target.value;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.fontSizeInput.addEventListener('change', (e) => {
    const val = parseInt(e.target.value) || 14;
    if (AppState.selectedBox) {
      AppState.selectedBox.fontSize = val;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnFontSizeDec.addEventListener('click', () => {
    let val = Math.max(6, (parseInt(DOM.fontSizeInput.value) || 14) - 1);
    DOM.fontSizeInput.value = val;
    if (AppState.selectedBox) {
      AppState.selectedBox.fontSize = val;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnFontSizeInc.addEventListener('click', () => {
    let val = Math.min(144, (parseInt(DOM.fontSizeInput.value) || 14) + 1);
    DOM.fontSizeInput.value = val;
    if (AppState.selectedBox) {
      AppState.selectedBox.fontSize = val;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnFormatBold.addEventListener('click', () => {
    if (AppState.selectedBox) {
      AppState.selectedBox.isBold = !AppState.selectedBox.isBold;
      DOM.btnFormatBold.classList.toggle('active', AppState.selectedBox.isBold);
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnFormatItalic.addEventListener('click', () => {
    if (AppState.selectedBox) {
      AppState.selectedBox.isItalic = !AppState.selectedBox.isItalic;
      DOM.btnFormatItalic.classList.toggle('active', AppState.selectedBox.isItalic);
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnFormatUnderline.addEventListener('click', () => {
    if (AppState.selectedBox) {
      AppState.selectedBox.isUnderline = !AppState.selectedBox.isUnderline;
      DOM.btnFormatUnderline.classList.toggle('active', AppState.selectedBox.isUnderline);
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.textColorPicker.addEventListener('input', (e) => {
    DOM.textColorIndicator.style.background = e.target.value;
    if (AppState.selectedBox) {
      AppState.selectedBox.color = e.target.value;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.bgMaskColorPicker.addEventListener('input', (e) => {
    DOM.bgColorIndicator.style.background = e.target.value;
    if (AppState.selectedBox) {
      AppState.selectedBox.backgroundColor = e.target.value;
      updateBoxDOM(AppState.selectedBox);
    }
  });

  // Alineación
  const setAlignment = (align) => {
    if (AppState.selectedBox) {
      AppState.selectedBox.textAlign = align;
      DOM.btnAlignLeft.classList.toggle('active', align === 'left');
      DOM.btnAlignCenter.classList.toggle('active', align === 'center');
      DOM.btnAlignRight.classList.toggle('active', align === 'right');
      updateBoxDOM(AppState.selectedBox);
    }
  };
  DOM.btnAlignLeft.addEventListener('click', () => setAlignment('left'));
  DOM.btnAlignCenter.addEventListener('click', () => setAlignment('center'));
  DOM.btnAlignRight.addEventListener('click', () => setAlignment('right'));

  // Cubrir / Enmascarar original
  DOM.btnMaskExisting.addEventListener('click', () => {
    if (AppState.selectedBox) {
      AppState.selectedBox.masked = !AppState.selectedBox.masked;
      DOM.btnMaskExisting.classList.toggle('active', AppState.selectedBox.masked);
      updateBoxDOM(AppState.selectedBox);
    }
  });

  DOM.btnDeleteBox.addEventListener('click', () => {
    if (AppState.selectedBox) {
      deleteBox(AppState.selectedBox);
    }
  });

  // Zoom
  DOM.btnZoomIn.addEventListener('click', () => changeZoom(0.15));
  DOM.btnZoomOut.addEventListener('click', () => changeZoom(-0.15));
  DOM.btnZoomFit.addEventListener('click', () => {
    AppState.zoomScale = 1.0;
    DOM.zoomLevelLabel.textContent = "100%";
    renderAllPages();
  });
}

function setToolMode(mode) {
  AppState.activeTool = mode;
  DOM.toolSelect.classList.toggle('active', mode === 'select');
  DOM.toolNewText.classList.toggle('active', mode === 'new-text');
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
      if (AppState.selectedBox) {
        deleteBox(AppState.selectedBox);
      }
    } else if (e.key === 'v' || e.key === 'V') {
      setToolMode('select');
    } else if (e.key === 't' || e.key === 'T') {
      setToolMode('new-text');
    }
  });
}

/* ==========================================================================
   Carga y Renderizado del PDF
   ========================================================================== */
async function loadPdfFromBuffer(bytes) {
  AppState.pdfBytes = bytes;
  const loadingTask = pdfjsLib.getDocument({ data: bytes.slice() });
  AppState.pdfDoc = await loadingTask.promise;
  AppState.totalPages = AppState.pdfDoc.numPages;
  AppState.currentPageIndex = 0;
  AppState.pageBoxes = {};

  if (DOM.emptyPlaceholder) {
    DOM.emptyPlaceholder.style.display = 'none';
  }

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
    card.dataset.pageIndex = i - 1;

    const previewWrap = document.createElement('div');
    previewWrap.className = 'thumb-preview-wrapper';

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    const label = document.createElement('span');
    label.className = 'page-thumb-num';
    label.textContent = `Página ${i}`;

    previewWrap.appendChild(canvas);
    card.appendChild(previewWrap);
    card.appendChild(label);

    card.addEventListener('click', () => {
      document.querySelectorAll('.page-thumb-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      AppState.currentPageIndex = i - 1;
      const targetPageEl = document.getElementById(`page-wrapper-${i - 1}`);
      if (targetPageEl) targetPageEl.scrollIntoView({ behavior: 'smooth' });
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
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    const overlay = document.createElement('div');
    overlay.className = 'text-boxes-overlay';
    overlay.id = `overlay-page-${pageIndex}`;
    overlay.dataset.pageIndex = pageIndex;

    // Click sobre la página para añadir nuevo texto
    overlay.addEventListener('click', (e) => {
      if (AppState.activeTool === 'new-text') {
        const rect = overlay.getBoundingClientRect();
        const x = (e.clientX - rect.left) / AppState.zoomScale;
        const y = (e.clientY - rect.top) / AppState.zoomScale;
        createNewTextBox(pageIndex, x, y, "Escribe aquí...", 14);
        setToolMode('select');
      } else if (e.target === overlay) {
        deselectAllBoxes();
      }
    });

    pageContainer.appendChild(canvas);
    pageContainer.appendChild(overlay);
    DOM.documentPagesScroller.appendChild(pageContainer);

    // Re-renderizar cuadros de texto existentes para esta página
    renderPageBoxes(pageIndex);
  }
}

/* ==========================================================================
   Gestión de Cuadros de Texto (Creación, Selección, Edición, Arrastre)
   ========================================================================== */
function createNewTextBox(pageIndex, x, y, text = "", fontSize = 14, width = 180, height = 28, isMasked = true) {
  if (!AppState.pageBoxes[pageIndex]) {
    AppState.pageBoxes[pageIndex] = [];
  }

  const newBox = {
    id: 'box_' + Math.random().toString(36).substr(2, 9),
    pageIndex,
    x,
    y,
    width,
    height,
    text,
    fontSize,
    fontFamily: "'Roboto', sans-serif",
    color: '#202124',
    backgroundColor: '#FFFFFF',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlign: 'left',
    masked: isMasked, // Si es true, cubre el texto original existente abajo
    domElement: null
  };

  AppState.pageBoxes[pageIndex].push(newBox);
  const el = mountBoxDOM(newBox);
  selectBox(newBox);
  return newBox;
}

function mountBoxDOM(box) {
  const overlay = document.getElementById(`overlay-page-${box.pageIndex}`);
  if (!overlay) return null;

  const boxEl = document.createElement('div');
  boxEl.className = 'editable-text-box';
  boxEl.id = box.id;

  const textEl = document.createElement('div');
  textEl.className = 'text-content';
  textEl.contentEditable = true;
  textEl.spellcheck = false;
  textEl.innerText = box.text;

  // Manilla de redimensión
  const handleSE = document.createElement('div');
  handleSE.className = 'resize-handle se';

  boxEl.appendChild(textEl);
  boxEl.appendChild(handleSE);
  overlay.appendChild(boxEl);

  box.domElement = boxEl;
  updateBoxDOM(box);

  // Eventos de edición de texto
  textEl.addEventListener('input', () => {
    box.text = textEl.innerText;
  });

  textEl.addEventListener('focus', () => {
    selectBox(box);
  });

  // Drag and Drop (Mover)
  boxEl.addEventListener('mousedown', (e) => {
    if (e.target === handleSE) return;
    selectBox(box);

    let startX = e.clientX;
    let startY = e.clientY;
    let initialX = box.x;
    let initialY = box.y;

    function onMouseMove(ev) {
      const dx = (ev.clientX - startX) / AppState.zoomScale;
      const dy = (ev.clientY - startY) / AppState.zoomScale;
      box.x = Math.max(0, initialX + dx);
      box.y = Math.max(0, initialY + dy);
      updateBoxDOM(box);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  // Redimensionar
  handleSE.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    let startX = e.clientX;
    let startY = e.clientY;
    let initialW = box.width;
    let initialH = box.height;

    function onMouseMove(ev) {
      const dw = (ev.clientX - startX) / AppState.zoomScale;
      const dh = (ev.clientY - startY) / AppState.zoomScale;
      box.width = Math.max(40, initialW + dw);
      box.height = Math.max(20, initialH + dh);
      updateBoxDOM(box);
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  return boxEl;
}

function updateBoxDOM(box) {
  if (!box.domElement) return;
  const el = box.domElement;
  el.style.left = `${box.x * AppState.zoomScale}px`;
  el.style.top = `${box.y * AppState.zoomScale}px`;
  el.style.width = `${box.width * AppState.zoomScale}px`;
  el.style.height = `${box.height * AppState.zoomScale}px`;

  if (box.masked) {
    el.classList.add('masked');
    el.style.backgroundColor = box.backgroundColor || '#ffffff';
  } else {
    el.classList.remove('masked');
    el.style.backgroundColor = 'transparent';
  }

  const textEl = el.querySelector('.text-content');
  if (textEl) {
    textEl.style.fontSize = `${box.fontSize * AppState.zoomScale}px`;
    textEl.style.fontFamily = box.fontFamily;
    textEl.style.color = box.color;
    textEl.style.fontWeight = box.isBold ? '700' : '400';
    textEl.style.fontStyle = box.isItalic ? 'italic' : 'normal';
    textEl.style.textDecoration = box.isUnderline ? 'underline' : 'none';
    textEl.style.textAlign = box.textAlign;
  }
}

function selectBox(box) {
  deselectAllBoxes();
  AppState.selectedBox = box;
  if (box.domElement) {
    box.domElement.classList.add('selected');
  }

  // Sincronizar UI de herramientas
  DOM.fontSizeInput.value = box.fontSize;
  DOM.fontSelect.value = box.fontFamily;
  DOM.textColorPicker.value = box.color;
  DOM.textColorIndicator.style.background = box.color;
  DOM.bgMaskColorPicker.value = box.backgroundColor || '#FFFFFF';
  DOM.bgColorIndicator.style.background = box.backgroundColor || '#FFFFFF';
  DOM.btnFormatBold.classList.toggle('active', !!box.isBold);
  DOM.btnFormatItalic.classList.toggle('active', !!box.isItalic);
  DOM.btnFormatUnderline.classList.toggle('active', !!box.isUnderline);
  DOM.btnMaskExisting.classList.toggle('active', !!box.masked);
  DOM.btnAlignLeft.classList.toggle('active', box.textAlign === 'left');
  DOM.btnAlignCenter.classList.toggle('active', box.textAlign === 'center');
  DOM.btnAlignRight.classList.toggle('active', box.textAlign === 'right');
}

function deselectAllBoxes() {
  document.querySelectorAll('.editable-text-box').forEach(el => el.classList.remove('selected'));
  AppState.selectedBox = null;
}

function deleteBox(box) {
  if (!box) return;
  if (box.domElement && box.domElement.parentNode) {
    box.domElement.parentNode.removeChild(box.domElement);
  }
  const list = AppState.pageBoxes[box.pageIndex] || [];
  AppState.pageBoxes[box.pageIndex] = list.filter(b => b.id !== box.id);
  AppState.selectedBox = null;
  showSnackbar("Cuadro de texto eliminado");
}

function renderPageBoxes(pageIndex) {
  const boxes = AppState.pageBoxes[pageIndex] || [];
  boxes.forEach(b => {
    mountBoxDOM(b);
  });
}

/* ==========================================================================
   Detección Nativa de Texto (PDF.js) para Reemplazo Inmediato
   ========================================================================== */
async function autoDetectExistingText(pageIndex) {
  if (!AppState.pdfDoc) return;
  showSnackbar("Detectando líneas de texto del PDF...");

  const page = await AppState.pdfDoc.getPage(pageIndex + 1);
  const textContent = await page.getTextContent();
  const viewport = page.getViewport({ scale: 1.0 }); // escala base 1.0

  let detectedCount = 0;
  textContent.items.forEach(item => {
    if (!item.str.trim()) return;

    // Transformación de coordenadas de PDF (origen abajo a la izquierda) a pantalla (arriba a la izquierda)
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    const fontSize = Math.sqrt(tx[0] * tx[0] + tx[1] * tx[1]);
    const x = tx[4];
    const y = tx[5] - fontSize;
    const width = Math.max(item.width, 30);
    const height = Math.max(fontSize * 1.2, 18);

    // Creamos cuadro con máscara blanca para ocultar el original y permitir edición
    createNewTextBox(pageIndex, x, y, item.str, Math.round(fontSize), width, height, true);
    detectedCount++;
  });

  showSnackbar(`Se detectaron ${detectedCount} textos listos para modificar`);
}

/* ==========================================================================
   OCR Inteligente con Tesseract.js para Documentos Escaneados / Imágenes
   ========================================================================== */
async function runOcrOnCurrentPage(pageIndex) {
  if (!AppState.pdfDoc) return;

  DOM.ocrModal.classList.add('show');
  DOM.ocrProgressFill.style.width = '5%';
  DOM.ocrProgressStatus.textContent = "Extrayendo imagen de la página...";

  try {
    const page = await AppState.pdfDoc.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 2.0 }); // Escala nítida para alta precisión OCR

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;
    const ctx = tempCanvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    DOM.ocrProgressStatus.textContent = "Analizando texto y caracteres...";

    const worker = await Tesseract.createWorker('spa+eng', 1, {
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round(m.progress * 100);
          DOM.ocrProgressFill.style.width = `${pct}%`;
          DOM.ocrProgressStatus.textContent = `Reconociendo: ${pct}%`;
        }
      }
    });

    const ret = await worker.recognize(tempCanvas);
    await worker.terminate();

    DOM.ocrModal.classList.remove('show');

    // Procesar líneas detectadas
    let ocrCount = 0;
    if (ret.data && ret.data.lines) {
      ret.data.lines.forEach(line => {
        if (!line.text.trim()) return;
        // Escalar de vuelta a la escala base (dividido por 2.0)
        const bbox = line.bbox;
        const x = bbox.x0 / 2.0;
        const y = bbox.y0 / 2.0;
        const width = (bbox.x1 - bbox.x0) / 2.0;
        const height = (bbox.y1 - bbox.y0) / 2.0;
        const approxFontSize = Math.max(10, Math.round(height * 0.75));

        createNewTextBox(pageIndex, x, y, line.text.trim(), approxFontSize, width, height, true);
        ocrCount++;
      });
    }

    showSnackbar(`OCR completado: ${ocrCount} bloques de texto detectados`);
  } catch (err) {
    console.error(err);
    DOM.ocrModal.classList.remove('show');
    showSnackbar("Error durante el procesamiento OCR");
  }
}

/* ==========================================================================
   Exportar PDF Modificado utilizando PDF-Lib
   ========================================================================== */
async function exportModifiedPdf() {
  if (!AppState.pdfBytes) {
    showSnackbar("No hay ningún documento abierto");
    return;
  }

  showSnackbar("Generando y exportando PDF...");

  try {
    const pdfDoc = await PDFLib.PDFDocument.load(AppState.pdfBytes);
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();

    for (let p = 0; p < pages.length; p++) {
      const page = pages[p];
      const pageHeight = page.getHeight();
      const boxes = AppState.pageBoxes[p] || [];

      for (const box of boxes) {
        if (!box.text.trim() && !box.masked) continue;

        // Conversión a coordenadas de PDF (origen inferior izquierdo)
        const pdfX = box.x;
        const pdfY = pageHeight - box.y - box.height;

        // Si está enmascarado, pintamos un rectángulo opaco para tapar el texto anterior
        if (box.masked) {
          page.drawRectangle({
            x: pdfX,
            y: pdfY,
            width: box.width,
            height: box.height,
            color: hexToRgbPdf(box.backgroundColor || '#FFFFFF')
          });
        }

        // Dibujar el nuevo texto editado si existe
        if (box.text.trim()) {
          const selectedFont = box.isBold ? fontBold : font;
          const textColor = hexToRgbPdf(box.color || '#202124');
          
          // Ajuste de línea vertical
          page.drawText(box.text, {
            x: pdfX + 2,
            y: pdfY + (box.height * 0.25),
            size: box.fontSize,
            font: selectedFont,
            color: textColor,
            maxWidth: box.width
          });
        }
      }
    }

    const modifiedBytes = await pdfDoc.save();
    downloadBlob(modifiedBytes, `${AppState.fileName || 'documento'}_editado.pdf`, 'application/pdf');
    showSnackbar("¡Documento exportado con éxito!");
  } catch (err) {
    console.error(err);
    showSnackbar("Error al exportar el PDF");
  }
}

function hexToRgbPdf(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return PDFLib.rgb((num >> 16) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255);
}

function downloadBlob(data, fileName, mimeType) {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   Generador de PDF de Prueba (Muestra)
   ========================================================================== */
async function loadSampleInvoice() {
  const samplePdf = await PDFLib.PDFDocument.create();
  const page = samplePdf.addPage([595, 842]); // Formato A4
  const font = await samplePdf.embedFont(PDFLib.StandardFonts.Helvetica);
  const fontBold = await samplePdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

  page.drawText("JD PDF STUDIO - FACTURA DE SERVICIOS", {
    x: 50,
    y: 780,
    size: 18,
    font: fontBold,
    color: PDFLib.rgb(0.1, 0.45, 0.91)
  });

  page.drawText("Cliente: Empresa Ejemplo S.A.", { x: 50, y: 730, size: 12, font });
  page.drawText("Número de Factura: #JD-2026-0042", { x: 50, y: 710, size: 12, font });
  page.drawText("Fecha de Emisión: 14 de Octubre de 2026", { x: 50, y: 690, size: 12, font });

  page.drawText("Descripción de Servicios:", { x: 50, y: 640, size: 14, font: fontBold });
  page.drawText("1. Consultoría en Modelado BIM y Gestión ISO 19650", { x: 60, y: 615, size: 11, font });
  page.drawText("2. Desarrollo de Automatizaciones Dynamo y Python", { x: 60, y: 595, size: 11, font });
  page.drawText("3. Integración de Flujos Cloud en Power Automate", { x: 60, y: 575, size: 11, font });

  page.drawText("Total a Pagar: $3,500.00 USD", {
    x: 50,
    y: 520,
    size: 14,
    font: fontBold,
    color: PDFLib.rgb(0.13, 0.54, 0.13)
  });

  page.drawText("Haz clic en 'Escanear Texto' en la barra superior para reemplazar", {
    x: 50,
    y: 450,
    size: 11,
    font,
    color: PDFLib.rgb(0.4, 0.4, 0.4)
  });
  page.drawText("cualquiera de estos párrafos de inmediato por tu propio texto.", {
    x: 50,
    y: 435,
    size: 11,
    font,
    color: PDFLib.rgb(0.4, 0.4, 0.4)
  });

  const bytes = await samplePdf.save();
  AppState.fileName = "Factura_Muestra_JD";
  DOM.documentNameInput.value = AppState.fileName;
  await loadPdfFromBuffer(bytes);
}

// Inicialización general
document.addEventListener('DOMContentLoaded', init);
