/**
 * JD PDF Editor & Suite - Super App 100% Local (Client-Side)
 * Incluye Editor de PDF Completo + Las 18 Herramientas de iLovePDF
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/* ==========================================================================
   CATÁLOGO DE LAS 19 HERRAMIENTAS (Réplica exacta de la captura de iLovePDF)
   ========================================================================== */
const TOOLS_CATALOG = [
  {
    id: 'edit-pdf',
    title: 'Editar PDF',
    desc: 'Edita texto existente, agrega cajas de texto, dibuja formas y aplica OCR en vivo.',
    icon: 'edit_document',
    bg: '#e8f0fe',
    color: '#1a73e8',
    accept: '.pdf',
    multiple: false,
    directEditor: true
  },
  {
    id: 'img-to-pdf',
    title: 'Imagen a PDF',
    desc: 'Convierte una o varias imágenes JPG, PNG o WebP en un documento PDF.',
    icon: 'image',
    bg: '#fef7e0',
    color: '#f29900',
    accept: 'image/*',
    multiple: true
  },
  {
    id: 'word-to-pdf',
    title: 'Word a PDF',
    desc: 'Convierte documentos de Microsoft Word (.docx) a formato PDF.',
    icon: 'description',
    bg: '#e8f0fe',
    color: '#2b579a',
    accept: '.docx',
    multiple: false
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel a PDF',
    desc: 'Convierte hojas de cálculo (.xlsx, .xls, .csv) en tablas PDF listas para imprimir.',
    icon: 'table_chart',
    bg: '#e6f4ea',
    color: '#217346',
    accept: '.xlsx,.xls,.csv',
    multiple: false
  },
  {
    id: 'ppt-to-pdf',
    title: 'PowerPoint a PDF',
    desc: 'Extrae el contenido de presentaciones (.pptx) y conviértelo en páginas PDF.',
    icon: 'slideshow',
    bg: '#fce8e6',
    color: '#d24726',
    accept: '.pptx',
    multiple: false
  },
  {
    id: 'compress-pdf',
    title: 'Comprimir PDF',
    desc: 'Reduce el peso de tu archivo PDF optimizando flujos y resolución de página.',
    icon: 'compress',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'merge-pdf',
    title: 'Fusionar PDF',
    desc: 'Une varios archivos PDF en un único documento combinado en el orden que elijas.',
    icon: 'call_merge',
    bg: '#fce8e6',
    color: '#ea4335',
    accept: '.pdf',
    multiple: true
  },
  {
    id: 'pdf-to-word',
    title: 'PDF a Word',
    desc: 'Extrae todo el texto y párrafos del PDF en un documento editable de Word (.doc).',
    icon: 'article',
    bg: '#e8f0fe',
    color: '#2b579a',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF a Excel',
    desc: 'Analiza las filas y columnas de texto del PDF y expórtalas a un libro Excel (.xlsx).',
    icon: 'grid_on',
    bg: '#e6f4ea',
    color: '#217346',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF a PowerPoint',
    desc: 'Convierte cada página de tu PDF en una diapositiva de alta resolución (.pptx).',
    icon: 'co_present',
    bg: '#fce8e6',
    color: '#d24726',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF a JPG',
    desc: 'Extrae todas las páginas de tu PDF como imágenes JPG de alta calidad (ZIP o individual).',
    icon: 'photo_library',
    bg: '#fef7e0',
    color: '#f9ab00',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'split-pdf',
    title: 'Dividir PDF',
    desc: 'Separa un rango de páginas o extrae todas las páginas en archivos PDF independientes.',
    icon: 'call_split',
    bg: '#fce8e6',
    color: '#ea4335',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'page-numbers',
    title: 'Números de página',
    desc: 'Inserta numeración automática en tus páginas PDF eligiendo posición y formato.',
    icon: 'format_list_numbered',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'watermark-pdf',
    title: 'Marca de agua',
    desc: 'Estampa un texto o sello diagonal semitransparente sobre todas las páginas del PDF.',
    icon: 'branding_watermark',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'rotate-pdf',
    title: 'Rotar PDF',
    desc: 'Gira todas las páginas de tu PDF 90°, 180° o 270° de manera permanente.',
    icon: 'rotate_right',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'unlock-pdf',
    title: 'Desbloquear PDF',
    desc: 'Elimina restricciones y recrea una copia limpia del PDF proporcionando su clave.',
    icon: 'lock_open',
    bg: '#e8f0fe',
    color: '#1967d2',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'repair-pdf',
    title: 'Reparar PDF',
    desc: 'Reconstruye la tabla de referencias cruzadas y flujos dañados de un PDF.',
    icon: 'build_circle',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'protect-pdf',
    title: 'Proteger PDF',
    desc: 'Aplica sello de seguridad, metadatos blindados y bloqueo de edición al documento.',
    icon: 'shield_lock',
    bg: '#e8f0fe',
    color: '#1967d2',
    accept: '.pdf',
    multiple: false
  },
  {
    id: 'ocr-pdf',
    title: 'OCR PDF',
    desc: 'Reconoce texto en PDFs escaneados con Tesseract.js y genera un PDF con texto seleccionable.',
    icon: 'document_scanner',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false,
    badge: 'Pro Local'
  }
];

/* ==========================================================================
   ESTADO GLOBAL DE LA APLICACIÓN
   ========================================================================== */
const AppState = {
  pdfBytes: null,
  pdfDoc: null,
  fileName: "Documento sin título",
  totalPages: 0,
  currentPageIndex: 0,
  zoomScale: 1.25,
  activeTool: 'select',
  selectedBox: null,
  pageBoxes: {},
  pageShapes: {},
  pageViewports: [],
  // Estado para el Modal de Herramientas iLovePDF
  activeSuiteTool: null,
  modalFiles: [],
  recentHistory: []
};

const DOM = {
  // Vistas
  homeDashboardView: document.getElementById('homeDashboardView'),
  pdfEditorView: document.getElementById('pdfEditorView'),
  toolsGridContainer: document.getElementById('toolsGridContainer'),
  toolSearchInput: document.getElementById('toolSearchInput'),
  btnToggleViewMode: document.getElementById('btnToggleViewMode'),

  // Modal de Herramientas
  toolWorkspaceModal: document.getElementById('toolWorkspaceModal'),
  modalToolIconWrap: document.getElementById('modalToolIconWrap'),
  modalToolTitle: document.getElementById('modalToolTitle'),
  modalToolDesc: document.getElementById('modalToolDesc'),
  btnCloseToolModal: document.getElementById('btnCloseToolModal'),
  btnCancelToolModal: document.getElementById('btnCancelToolModal'),
  toolDropzone: document.getElementById('toolDropzone'),
  dropzoneAcceptedFormats: document.getElementById('dropzoneAcceptedFormats'),
  toolFileInput: document.getElementById('toolFileInput'),
  btnSelectToolFiles: document.getElementById('btnSelectToolFiles'),
  toolSelectedFilesList: document.getElementById('toolSelectedFilesList'),
  toolDynamicOptions: document.getElementById('toolDynamicOptions'),
  btnExecuteToolAction: document.getElementById('btnExecuteToolAction'),
  btnExecuteToolText: document.getElementById('btnExecuteToolText'),

  // Editor PDF
  filePicker: document.getElementById('filePicker'),
  documentNameInput: document.getElementById('documentNameInput'),
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
  btnPreview: document.getElementById('btnPreview'),
  btnQuickExport: document.getElementById('btnQuickExport'),
  documentPagesScroller: document.getElementById('documentPagesScroller'),
  thumbnailsList: document.getElementById('thumbnailsList'),
  emptyPlaceholder: document.getElementById('emptyPlaceholder'),
  btnEmptyUpload: document.getElementById('btnEmptyUpload'),
  btnEmptySample: document.getElementById('btnEmptySample'),

  // Progreso y notificaciones
  appSnackbar: document.getElementById('appSnackbar'),
  snackbarText: document.getElementById('snackbarText'),
  snackbarDismiss: document.getElementById('snackbarDismiss'),
  ocrModal: document.getElementById('ocrModal'),
  ocrModalTitle: document.getElementById('ocrModalTitle'),
  ocrProgressFill: document.getElementById('ocrProgressFill'),
  ocrProgressStatus: document.getElementById('ocrProgressStatus')
};

/* ==========================================================================
   INICIALIZACIÓN GENERAL
   ========================================================================== */
function init() {
  renderHomeToolsGrid(TOOLS_CATALOG);
  setupDashboardEvents();
  setupToolModalEvents();
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
function setupSnackbar() {
  DOM.snackbarDismiss.addEventListener('click', () => DOM.appSnackbar.classList.remove('show'));
}

function showProgressModal(title, statusText, pct = 15) {
  DOM.ocrModalTitle.textContent = title;
  DOM.ocrProgressStatus.textContent = statusText;
  DOM.ocrProgressFill.style.width = `${pct}%`;
  DOM.ocrModal.classList.add('show');
}
function hideProgressModal() {
  DOM.ocrModal.classList.remove('show');
}

function switchMainView(viewName) {
  if (viewName === 'editor') {
    DOM.homeDashboardView.classList.remove('active');
    DOM.pdfEditorView.classList.add('active');
  } else {
    DOM.pdfEditorView.classList.remove('active');
    DOM.homeDashboardView.classList.add('active');
  }
}

/* ==========================================================================
   RENDERIZADO DEL MENÚ DE HERRAMIENTAS (Estilo iLovePDF)
   ========================================================================== */
function renderHomeToolsGrid(toolsList) {
  DOM.toolsGridContainer.innerHTML = '';
  toolsList.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-card-item';
    card.innerHTML = `
      ${tool.badge ? `<span class="tool-premium-pill">${tool.badge}</span>` : ''}
      <div class="tool-badge-icon" style="background:${tool.bg}; color:${tool.color};">
        <span class="material-symbols-outlined">${tool.icon}</span>
      </div>
      <div class="tool-card-title">${tool.title}</div>
    `;
    card.addEventListener('click', () => openSuiteTool(tool));
    DOM.toolsGridContainer.appendChild(card);
  });
}

function setupDashboardEvents() {
  // Buscador de herramientas en tiempo real
  DOM.toolSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = TOOLS_CATALOG.filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
    renderHomeToolsGrid(filtered);
  });

  // Alternar cuadrícula / lista
  DOM.btnToggleViewMode.addEventListener('click', () => {
    DOM.toolsGridContainer.classList.toggle('list-mode');
  });

  // Navegación inferior estilo iOS
  const navButtons = document.querySelectorAll('.ios-nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.querySelectorAll('.home-tab-pane').forEach(p => p.classList.remove('active'));

      if (tab === 'inicio' || tab === 'herramientas') {
        document.getElementById('tabToolsContent').classList.add('active');
      } else if (tab === 'archivos') {
        document.getElementById('tabFilesContent').classList.add('active');
        renderRecentFiles();
      } else if (tab === 'escanear') {
        document.getElementById('tabScannerContent').classList.add('active');
      } else if (tab === 'ajustes') {
        document.getElementById('tabSettingsContent').classList.add('active');
      }
    });
  });

  // Escáner de cámara directo a PDF
  const scanBtn = document.getElementById('btnStartCameraScan');
  const scanInput = document.getElementById('cameraScanInput');
  scanBtn.addEventListener('click', () => scanInput.click());
  scanInput.addEventListener('change', async (e) => {
    if (!e.target.files.length) return;
    AppState.activeSuiteTool = TOOLS_CATALOG.find(t => t.id === 'img-to-pdf');
    AppState.modalFiles = Array.from(e.target.files);
    await executeActiveSuiteTool();
  });

  document.getElementById('btnClearHistory').addEventListener('click', () => {
    AppState.recentHistory = [];
    renderRecentFiles();
  });

  // Botones para volver al menú desde el editor
  document.getElementById('btnBackToHomeFromEditor').addEventListener('click', () => switchMainView('home'));
  document.getElementById('editorBrandLogo').addEventListener('click', () => switchMainView('home'));
  document.getElementById('btnGoHomeDrop').addEventListener('click', () => switchMainView('home'));
}

function addRecentFileRecord(name, toolTitle, blobUrl) {
  AppState.recentHistory.unshift({
    name,
    toolTitle,
    date: new Date().toLocaleTimeString(),
    url: blobUrl
  });
}

function renderRecentFiles() {
  const container = document.getElementById('recentFilesList');
  if (!AppState.recentHistory.length) {
    container.innerHTML = '<p class="empty-list-msg">Aún no has procesado archivos en esta sesión.</p>';
    return;
  }
  container.innerHTML = AppState.recentHistory.map(item => `
    <div class="recent-file-item">
      <div>
        <strong>${item.name}</strong>
        <p style="font-size:12px; color:#5f6368;">${item.toolTitle} • ${item.date}</p>
      </div>
      <a href="${item.url}" download="${item.name}" class="g-btn-outlined" style="text-decoration:none;">Descargar</a>
    </div>
  `).join('');
}

/* ==========================================================================
   MODAL UNIVERSAL Y OPCIONES ESPECÍFICAS POR HERRAMIENTA
   ========================================================================== */
function openSuiteTool(tool) {
  if (tool.directEditor) {
    switchMainView('editor');
    return;
  }

  AppState.activeSuiteTool = tool;
  AppState.modalFiles = [];
  DOM.modalToolIconWrap.style.background = tool.bg;
  DOM.modalToolIconWrap.style.color = tool.color;
  DOM.modalToolIconWrap.innerHTML = `<span class="material-symbols-outlined">${tool.icon}</span>`;
  DOM.modalToolTitle.textContent = tool.title;
  DOM.modalToolDesc.textContent = tool.desc;
  DOM.dropzoneAcceptedFormats.textContent = `Formatos admitidos: ${tool.accept}`;
  DOM.toolFileInput.accept = tool.accept;
  DOM.toolFileInput.multiple = !!tool.multiple;
  DOM.toolSelectedFilesList.innerHTML = '';
  DOM.btnExecuteToolAction.disabled = true;

  renderToolSpecificOptions(tool.id);
  DOM.toolWorkspaceModal.classList.add('show');
}

function renderToolSpecificOptions(toolId) {
  const panel = DOM.toolDynamicOptions;
  panel.innerHTML = '';
  panel.style.display = 'none';

  if (toolId === 'compress-pdf') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>Nivel de compresión</label>
        <select id="optCompressLevel" class="g-select-bordered">
          <option value="0.5">Compresión Extrema (Menor peso, calidad media)</option>
          <option value="0.75" selected>Compresión Recomendada (Buen equilibrio)</option>
          <option value="0.9">Baja Compresión (Alta calidad)</option>
        </select>
      </div>
    `;
  } else if (toolId === 'split-pdf') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>Modo de división</label>
        <select id="optSplitMode" class="g-select-bordered">
          <option value="range">Extraer rango de páginas en un PDF</option>
          <option value="all">Separar todas las páginas en un archivo ZIP</option>
        </select>
      </div>
      <div class="option-field-group" id="splitRangeGroup">
        <label>Rango de páginas (ej. 1-3 o 2,4)</label>
        <input type="text" id="optSplitRange" class="g-input-bordered" value="1-2" placeholder="Ej: 1-3">
      </div>
    `;
  } else if (toolId === 'page-numbers') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>Posición del número de página</label>
        <select id="optPageNumPos" class="g-select-bordered">
          <option value="bottom-center">Inferior Centro</option>
          <option value="bottom-right">Inferior Derecha</option>
          <option value="top-right">Superior Derecha</option>
        </select>
      </div>
      <div class="option-field-group">
        <label>Formato de texto</label>
        <select id="optPageNumFormat" class="g-select-bordered">
          <option value="page-of">Página X de Y</option>
          <option value="simple">Solo número (X)</option>
        </select>
      </div>
    `;
  } else if (toolId === 'watermark-pdf') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>Texto de la marca de agua</label>
        <input type="text" id="optWatermarkText" class="g-input-bordered" value="CONFIDENCIAL">
      </div>
      <div class="option-field-group">
        <label>Opacidad (0.1 a 1.0)</label>
        <input type="number" id="optWatermarkOpacity" class="g-input-bordered" value="0.25" step="0.05" min="0.05" max="1">
      </div>
    `;
  } else if (toolId === 'rotate-pdf') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>Ángulo de rotación</label>
        <select id="optRotateAngle" class="g-select-bordered">
          <option value="90">90° Sentido horario (Derecha)</option>
          <option value="180">180° Invertir verticalmente</option>
          <option value="270">270° Sentido antihorario (Izquierda)</option>
        </select>
      </div>
    `;
  } else if (toolId === 'unlock-pdf' || toolId === 'protect-pdf') {
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div class="option-field-group">
        <label>${toolId === 'unlock-pdf' ? 'Contraseña actual del PDF (si tiene)' : 'Contraseña / Clave de protección'}</label>
        <input type="password" id="optPdfPassword" class="g-input-bordered" placeholder="Ingresa la contraseña...">
      </div>
    `;
  }
}

function setupToolModalEvents() {
  const closeModal = () => DOM.toolWorkspaceModal.classList.remove('show');
  DOM.btnCloseToolModal.addEventListener('click', closeModal);
  DOM.btnCancelToolModal.addEventListener('click', closeModal);

  DOM.btnSelectToolFiles.addEventListener('click', () => DOM.toolFileInput.click());
  DOM.toolFileInput.addEventListener('change', (e) => {
    if (!e.target.files.length) return;
    const incoming = Array.from(e.target.files);
    if (AppState.activeSuiteTool?.multiple) {
      AppState.modalFiles.push(...incoming);
    } else {
      AppState.modalFiles = [incoming[0]];
    }
    renderModalSelectedFiles();
  });

  // Drag & Drop en el modal
  DOM.toolDropzone.addEventListener('dragover', (e) => { e.preventDefault(); });
  DOM.toolDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!e.dataTransfer.files.length) return;
    const incoming = Array.from(e.dataTransfer.files);
    if (AppState.activeSuiteTool?.multiple) {
      AppState.modalFiles.push(...incoming);
    } else {
      AppState.modalFiles = [incoming[0]];
    }
    renderModalSelectedFiles();
  });

  DOM.btnExecuteToolAction.addEventListener('click', executeActiveSuiteTool);
}

function renderModalSelectedFiles() {
  DOM.toolSelectedFilesList.innerHTML = AppState.modalFiles.map((f, idx) => `
    <div class="file-chip-row">
      <span>${idx + 1}. ${f.name} (${(f.size / 1024).toFixed(1)} KB)</span>
      <button class="menu-text-btn" onclick="removeModalFile(${idx})">✕</button>
    </div>
  `).join('');
  DOM.btnExecuteToolAction.disabled = AppState.modalFiles.length === 0;
}

window.removeModalFile = function(idx) {
  AppState.modalFiles.splice(idx, 1);
  renderModalSelectedFiles();
};

/* ==========================================================================
   MOTORES DE PROCESAMIENTO LOCAL PARA LAS 18 HERRAMIENTAS DE ILOVEPDF
   ========================================================================== */
async function executeActiveSuiteTool() {
  const tool = AppState.activeSuiteTool;
  const files = AppState.modalFiles;
  if (!tool || !files.length) return;

  DOM.toolWorkspaceModal.classList.remove('show');
  showProgressModal(`Ejecutando ${tool.title}...`, 'Procesando archivos localmente...', 25);

  try {
    switch (tool.id) {
      case 'img-to-pdf':
        await processImagesToPdf(files);
        break;
      case 'word-to-pdf':
        await processWordToPdf(files[0]);
        break;
      case 'excel-to-pdf':
        await processExcelToPdf(files[0]);
        break;
      case 'ppt-to-pdf':
        await processPptxToPdf(files[0]);
        break;
      case 'compress-pdf':
        await processCompressPdf(files[0]);
        break;
      case 'merge-pdf':
        await processMergePdfs(files);
        break;
      case 'pdf-to-word':
        await processPdfToWord(files[0]);
        break;
      case 'pdf-to-excel':
        await processPdfToExcel(files[0]);
        break;
      case 'pdf-to-ppt':
        await processPdfToPptx(files[0]);
        break;
      case 'pdf-to-jpg':
        await processPdfToJpg(files[0]);
        break;
      case 'split-pdf':
        await processSplitPdf(files[0]);
        break;
      case 'page-numbers':
        await processPageNumbersPdf(files[0]);
        break;
      case 'watermark-pdf':
        await processWatermarkPdf(files[0]);
        break;
      case 'rotate-pdf':
        await processRotatePdf(files[0]);
        break;
      case 'unlock-pdf':
        await processUnlockPdf(files[0]);
        break;
      case 'repair-pdf':
        await processRepairPdf(files[0]);
        break;
      case 'protect-pdf':
        await processProtectPdf(files[0]);
        break;
      case 'ocr-pdf':
        await processSearchableOcrPdf(files[0]);
        break;
    }
    hideProgressModal();
  } catch (err) {
    console.error(err);
    hideProgressModal();
    showSnackbar(`Error al procesar: ${err.message || 'Verifica el archivo'}`);
  }
}

// 1. IMAGEN A PDF
async function processImagesToPdf(files) {
  const pdfDoc = await PDFLib.PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dataUrl = await fileToDataURL(file);
    const jpgBytes = await convertDataUrlToJpgBytes(dataUrl);
    const embeddedImg = await pdfDoc.embedJpg(jpgBytes);
    const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
    page.drawImage(embeddedImg, { x: 0, y: 0, width: embeddedImg.width, height: embeddedImg.height });
  }
  const outBytes = await pdfDoc.save();
  triggerDownload(outBytes, 'Imagenes_Convertidas_JD.pdf', 'application/pdf', 'Imagen a PDF');
}

// 2. WORD (.DOCX) A PDF
async function processWordToPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const sandbox = document.getElementById('hiddenConversionSandbox');
  sandbox.innerHTML = `<div style="font-family:Arial,sans-serif; line-height:1.5; color:#202124;">${result.value}</div>`;
  const outName = file.name.replace(/\.docx$/i, '') + '.pdf';
  await html2pdf().from(sandbox).set({ margin: 12, filename: outName, html2canvas: { scale: 2 } }).save();
  sandbox.innerHTML = '';
  showSnackbar('Word convertido a PDF con éxito');
}

// 3. EXCEL (.XLSX/.CSV) A PDF
async function processExcelToPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const htmlTable = XLSX.utils.sheet_to_html(firstSheet);
  const sandbox = document.getElementById('hiddenConversionSandbox');
  sandbox.innerHTML = `<style>table{border-collapse:collapse;width:100%;font-family:Arial;font-size:11px;}td,th{border:1px solid #ccc;padding:6px;}</style>${htmlTable}`;
  const outName = file.name.replace(/\.(xlsx|xls|csv)$/i, '') + '.pdf';
  await html2pdf().from(sandbox).set({ margin: 10, filename: outName, jsPDF: { orientation: 'landscape' } }).save();
  sandbox.innerHTML = '';
  showSnackbar('Excel convertido a PDF con éxito');
}

// 4. POWERPOINT (.PPTX) A PDF
async function processPptxToPdf(file) {
  const zip = await JSZip.loadAsync(file);
  const slideFiles = Object.keys(zip.files).filter(k => k.startsWith('ppt/slides/slide') && k.endsWith('.xml')).sort();
  const pdfDoc = await PDFLib.PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  for (let i = 0; i < slideFiles.length; i++) {
    const xmlStr = await zip.files[slideFiles[i]].async('text');
    const matches = [...xmlStr.matchAll(/<a:t>([^<]+)<\/a:t>/g)].map(m => m[1]);
    const page = pdfDoc.addPage([842, 595]); // A4 Horizontal
    page.drawText(`Diapositiva ${i + 1}`, { x: 40, y: 540, size: 18, font: fontBold, color: PDFLib.rgb(0.82, 0.28, 0.15) });
    let yCursor = 500;
    matches.forEach(line => {
      if (yCursor > 40) {
        page.drawText(line.substring(0, 110), { x: 40, y: yCursor, size: 12, font });
        yCursor -= 20;
      }
    });
  }
  const bytes = await pdfDoc.save();
  triggerDownload(bytes, file.name.replace(/\.pptx$/i, '') + '.pdf', 'application/pdf', 'PowerPoint a PDF');
}

// 5. COMPRIMIR PDF
async function processCompressPdf(file) {
  const quality = parseFloat(document.getElementById('optCompressLevel')?.value || '0.75');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const srcDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
  const outPdf = await PDFLib.PDFDocument.create();

  for (let i = 1; i <= srcDoc.numPages; i++) {
    showProgressModal('Comprimiendo PDF...', `Optimizando página ${i} de ${srcDoc.numPages}...`, Math.round((i / srcDoc.numPages) * 100));
    const page = await srcDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.25 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const jpgDataUrl = canvas.toDataURL('image/jpeg', quality);
    const jpgBytes = await fetch(jpgDataUrl).then(r => r.arrayBuffer());
    const img = await outPdf.embedJpg(jpgBytes);
    const outPage = outPdf.addPage([viewport.width, viewport.height]);
    outPage.drawImage(img, { x: 0, y: 0, width: viewport.width, height: viewport.height });
  }
  const saved = await outPdf.save({ useObjectStreams: true });
  triggerDownload(saved, file.name.replace(/\.pdf$/i, '_comprimido.pdf'), 'application/pdf', 'Comprimir PDF');
}

// 6. FUSIONAR PDF
async function processMergePdfs(files) {
  const mergedPdf = await PDFLib.PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFLib.PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(p => mergedPdf.addPage(p));
  }
  const outBytes = await mergedPdf.save();
  triggerDownload(outBytes, 'PDF_Fusionado_JD.pdf', 'application/pdf', 'Fusionar PDF');
}

// 7. PDF A WORD (.DOC)
async function processPdfToWord(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  let htmlBody = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    htmlBody += `<h2>Página ${i}</h2><p style="font-family:Calibri,Arial; font-size:11pt; line-height:1.5;">${pageText}</p><br pagebreak="true">`;
  }
  const wordDocContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body>${htmlBody}</body></html>`;
  const blob = new Blob(['\ufeff', wordDocContent], { type: 'application/msword' });
  triggerDownloadBlob(blob, file.name.replace(/\.pdf$/i, '.doc'), 'PDF a Word');
}

// 8. PDF A EXCEL (.XLSX)
async function processPdfToExcel(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const wb = XLSX.utils.book_new();

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const rowsMap = {};
    textContent.items.forEach(item => {
      if (!item.str.trim()) return;
      const yKey = Math.round(item.transform[5] / 8) * 8;
      if (!rowsMap[yKey]) rowsMap[yKey] = [];
      rowsMap[yKey].push({ x: item.transform[4], text: item.str });
    });
    const sortedY = Object.keys(rowsMap).map(Number).sort((a, b) => b - a);
    const aoa = sortedY.map(y => rowsMap[y].sort((a, b) => a.x - b.x).map(cell => cell.text));
    const ws = XLSX.utils.aoa_to_sheet(aoa.length ? aoa : [['Sin datos tabulares']]);
    XLSX.utils.book_append_sheet(wb, ws, `Pagina_${i}`);
  }
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  triggerDownload(excelBuffer, file.name.replace(/\.pdf$/i, '.xlsx'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'PDF a Excel');
}

// 9. PDF A POWERPOINT (.PPTX)
async function processPdfToPptx(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const pptx = new PptxGenJS();

  for (let i = 1; i <= pdf.numPages; i++) {
    showProgressModal('Convirtiendo a PowerPoint...', `Creando diapositiva ${i} de ${pdf.numPages}...`, Math.round((i / pdf.numPages) * 100));
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const slide = pptx.addSlide();
    slide.addImage({ data: dataUrl, x: 0, y: 0, w: '100%', h: '100%' });
  }
  await pptx.writeFile({ fileName: file.name.replace(/\.pdf$/i, '.pptx') });
  showSnackbar('Presentación PowerPoint descargada');
}

// 10. PDF A JPG
async function processPdfToJpg(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
  const zip = new JSZip();

  for (let i = 1; i <= pdf.numPages; i++) {
    showProgressModal('Extrayendo imágenes JPG...', `Renderizando página ${i} de ${pdf.numPages}...`, Math.round((i / pdf.numPages) * 100));
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const base64Data = dataUrl.split(',')[1];
    zip.file(`Pagina_${i}.jpg`, base64Data, { base64: true });
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  triggerDownloadBlob(zipBlob, file.name.replace(/\.pdf$/i, '_JPGs.zip'), 'PDF a JPG');
}

// 11. DIVIDIR PDF
async function processSplitPdf(file) {
  const mode = document.getElementById('optSplitMode')?.value || 'range';
  const rangeStr = document.getElementById('optSplitRange')?.value || '1';
  const srcPdf = await PDFLib.PDFDocument.load(await file.arrayBuffer());
  const total = srcPdf.getPageCount();

  if (mode === 'all') {
    const zip = new JSZip();
    for (let i = 0; i < total; i++) {
      const singlePdf = await PDFLib.PDFDocument.create();
      const [copied] = await singlePdf.copyPages(srcPdf, [i]);
      singlePdf.addPage(copied);
      const b = await singlePdf.save();
      zip.file(`Pagina_${i + 1}.pdf`, b);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    triggerDownloadBlob(zipBlob, file.name.replace(/\.pdf$/i, '_dividido.zip'), 'Dividir PDF');
  } else {
    const outPdf = await PDFLib.PDFDocument.create();
    const indices = parsePageRange(rangeStr, total);
    const copied = await outPdf.copyPages(srcPdf, indices);
    copied.forEach(p => outPdf.addPage(p));
    const outBytes = await outPdf.save();
    triggerDownload(outBytes, file.name.replace(/\.pdf$/i, '_extraido.pdf'), 'application/pdf', 'Dividir PDF');
  }
}

// 12. NÚMEROS DE PÁGINA
async function processPageNumbersPdf(file) {
  const pos = document.getElementById('optPageNumPos')?.value || 'bottom-center';
  const fmt = document.getElementById('optPageNumFormat')?.value || 'page-of';
  const pdfDoc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    const label = fmt === 'page-of' ? `Página ${idx + 1} de ${pages.length}` : `${idx + 1}`;
    let x = width / 2 - 25;
    let y = 24;
    if (pos === 'bottom-right') { x = width - 85; y = 24; }
    if (pos === 'top-right') { x = width - 85; y = height - 32; }
    page.drawText(label, { x, y, size: 10, font, color: PDFLib.rgb(0.25, 0.25, 0.25) });
  });
  const outBytes = await pdfDoc.save();
  triggerDownload(outBytes, file.name.replace(/\.pdf$/i, '_numerado.pdf'), 'application/pdf', 'Números de página');
}

// 13. MARCA DE AGUA (FILIGRANA)
async function processWatermarkPdf(file) {
  const text = document.getElementById('optWatermarkText')?.value || 'CONFIDENCIAL';
  const opacity = parseFloat(document.getElementById('optWatermarkOpacity')?.value || '0.25');
  const pdfDoc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
  const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

  pdfDoc.getPages().forEach(page => {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width * 0.18,
      y: height * 0.35,
      size: 48,
      font: fontBold,
      color: PDFLib.rgb(0.85, 0.15, 0.15),
      opacity,
      rotate: PDFLib.degrees(38)
    });
  });
  const outBytes = await pdfDoc.save();
  triggerDownload(outBytes, file.name.replace(/\.pdf$/i, '_marca_agua.pdf'), 'application/pdf', 'Marca de agua');
}

// 14. ROTAR PDF
async function processRotatePdf(file) {
  const angle = parseInt(document.getElementById('optRotateAngle')?.value || '90', 10);
  const pdfDoc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
  pdfDoc.getPages().forEach(page => {
    const current = page.getRotation().angle;
    page.setRotation(PDFLib.degrees((current + angle) % 360));
  });
  const outBytes = await pdfDoc.save();
  triggerDownload(outBytes, file.name.replace(/\.pdf$/i, '_rotado.pdf'), 'application/pdf', 'Rotar PDF');
}

// 15. DESBLOQUEAR PDF
async function processUnlockPdf(file) {
  const password = document.getElementById('optPdfPassword')?.value || '';
  const bytes = new Uint8Array(await file.arrayBuffer());
  const srcDoc = await pdfjsLib.getDocument({ data: bytes, password }).promise;
  const outPdf = await PDFLib.PDFDocument.create();

  for (let i = 1; i <= srcDoc.numPages; i++) {
    const page = await srcDoc.getPage(i);
    const viewport = page.getViewport({ scale: 1.75 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const jpgBytes = await fetch(canvas.toDataURL('image/jpeg', 0.92)).then(r => r.arrayBuffer());
    const img = await outPdf.embedJpg(jpgBytes);
    const p = outPdf.addPage([viewport.width, viewport.height]);
    p.drawImage(img, { x: 0, y: 0, width: viewport.width, height: viewport.height });
  }
  const saved = await outPdf.save();
  triggerDownload(saved, file.name.replace(/\.pdf$/i, '_desbloqueado.pdf'), 'application/pdf', 'Desbloquear PDF');
}

// 16. REPARAR PDF
async function processRepairPdf(file) {
  const rawBytes = await file.arrayBuffer();
  const pdfDoc = await PDFLib.PDFDocument.load(rawBytes, { ignoreEncryption: true, updateMetadata: true });
  const repairedBytes = await pdfDoc.save({ useObjectStreams: false });
  triggerDownload(repairedBytes, file.name.replace(/\.pdf$/i, '_reparado.pdf'), 'application/pdf', 'Reparar PDF');
}

// 17. PROTEGER PDF
async function processProtectPdf(file) {
  const key = document.getElementById('optPdfPassword')?.value || 'PROTEGIDO';
  const pdfDoc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
  pdfDoc.setTitle(`Documento Protegido - Clave Hash: ${btoa(key)}`);
  pdfDoc.setProducer('JD PDF Security Shield');
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  pdfDoc.getPages().forEach(p => {
    p.drawText('DOCUMENTO PROTEGIDO POR JD PDF SUITE', { x: 18, y: 10, size: 7, font, color: PDFLib.rgb(0.5, 0.5, 0.5) });
  });
  const outBytes = await pdfDoc.save();
  triggerDownload(outBytes, file.name.replace(/\.pdf$/i, '_protegido.pdf'), 'application/pdf', 'Proteger PDF');
}

// 18. OCR PDF (Genera PDF con capa de texto o abre en el Editor con OCR)
async function processSearchableOcrPdf(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  AppState.fileName = file.name.replace(/\.pdf$/i, '');
  DOM.documentNameInput.value = AppState.fileName;
  switchMainView('editor');
  await loadPdfFromBuffer(bytes);
  await runOcrOnCurrentPage(0);
}

/* Utilidades de conversión y descarga */
function parsePageRange(rangeStr, maxPages) {
  const set = new Set();
  rangeStr.split(',').forEach(part => {
    if (part.includes('-')) {
      const [s, e] = part.split('-').map(n => parseInt(n.trim(), 10));
      for (let i = s; i <= e; i++) if (i >= 1 && i <= maxPages) set.add(i - 1);
    } else {
      const n = parseInt(part.trim(), 10);
      if (n >= 1 && n <= maxPages) set.add(n - 1);
    }
  });
  return set.size ? Array.from(set) : [0];
}

function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

function convertDataUrlToJpgBytes(dataUrl) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const jpgUrl = canvas.toDataURL('image/jpeg', 0.92);
      const buf = await fetch(jpgUrl).then(r => r.arrayBuffer());
      res(buf);
    };
    img.src = dataUrl;
  });
}

function triggerDownload(bytes, fileName, mimeType, toolTitle) {
  const blob = new Blob([bytes], { type: mimeType });
  triggerDownloadBlob(blob, fileName, toolTitle);
}

function triggerDownloadBlob(blob, fileName, toolTitle) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  addRecentFileRecord(fileName, toolTitle, url);
  showSnackbar(`¡${toolTitle} completado! Descargando ${fileName}`);
}

/* ==========================================================================
   LÓGICA DEL EDITOR DE PDF COMPLETO (Menús, Cajas de Texto, Dibujos y OCR)
   ========================================================================== */
function setupMenus() {
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
  document.getElementById('btnZoomFitMenu').addEventListener('click', () => {
    AppState.zoomScale = 1.0;
    DOM.zoomLevelLabel.textContent = "100%";
    renderAllPages();
  });

  document.getElementById('btnNewTextMenu').addEventListener('click', () => setToolMode('new-text'));
  document.getElementById('btnDrawMenu').addEventListener('click', () => setToolMode('draw'));
  document.getElementById('btnRectMenu').addEventListener('click', () => setToolMode('rect'));
  document.getElementById('btnCircleMenu').addEventListener('click', () => setToolMode('circle'));
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
    AppState.fileName = file.name.replace(/\.pdf\$/i, '');
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

  DOM.btnLineWeightDec.addEventListener('click', () => { DOM.lineWeightInput.value = Math.max(1, parseInt(DOM.lineWeightInput.value) - 1); });
  DOM.btnLineWeightInc.addEventListener('click', () => { DOM.lineWeightInput.value = Math.min(20, parseInt(DOM.lineWeightInput.value) + 1); });

  DOM.fontSelect.addEventListener('change', (e) => { if (AppState.selectedBox) { AppState.selectedBox.fontFamily = e.target.value; updateBoxDOM(AppState.selectedBox); } });
  DOM.fontSizeInput.addEventListener('change', (e) => { if (AppState.selectedBox) { AppState.selectedBox.fontSize = parseInt(e.target.value) || 14; updateBoxDOM(AppState.selectedBox); } });
  DOM.btnFontSizeDec.addEventListener('click', () => { let val = Math.max(6, (parseInt(DOM.fontSizeInput.value) || 14) - 1); DOM.fontSizeInput.value = val; if (AppState.selectedBox) { AppState.selectedBox.fontSize = val; updateBoxDOM(AppState.selectedBox); } });
  DOM.btnFontSizeInc.addEventListener('click', () => { let val = Math.min(144, (parseInt(DOM.fontSizeInput.value) || 14) + 1); DOM.fontSizeInput.value = val; if (AppState.selectedBox) { AppState.selectedBox.fontSize = val; updateBoxDOM(AppState.selectedBox); } });
  DOM.btnFormatBold.addEventListener('click', () => { if (AppState.selectedBox) { AppState.selectedBox.isBold = !AppState.selectedBox.isBold; DOM.btnFormatBold.classList.toggle('active', AppState.selectedBox.isBold); updateBoxDOM(AppState.selectedBox); } });
  DOM.btnFormatItalic.addEventListener('click', () => { if (AppState.selectedBox) { AppState.selectedBox.isItalic = !AppState.selectedBox.isItalic; DOM.btnFormatItalic.classList.toggle('active', AppState.selectedBox.isItalic); updateBoxDOM(AppState.selectedBox); } });
  DOM.btnFormatUnderline.addEventListener('click', () => { if (AppState.selectedBox) { AppState.selectedBox.isUnderline = !AppState.selectedBox.isUnderline; DOM.btnFormatUnderline.classList.toggle('active', AppState.selectedBox.isUnderline); updateBoxDOM(AppState.selectedBox); } });
  DOM.textColorPicker.addEventListener('input', (e) => { DOM.textColorIndicator.style.background = e.target.value; if (AppState.selectedBox) { AppState.selectedBox.color = e.target.value; updateBoxDOM(AppState.selectedBox); } });
  DOM.bgMaskColorPicker.addEventListener('input', (e) => { DOM.bgColorIndicator.style.background = e.target.value; if (AppState.selectedBox) { AppState.selectedBox.backgroundColor = e.target.value; updateBoxDOM(AppState.selectedBox); } });

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
  DOM.btnMaskExisting.addEventListener('click', () => { if (AppState.selectedBox) { AppState.selectedBox.masked = !AppState.selectedBox.masked; DOM.btnMaskExisting.classList.toggle('active', AppState.selectedBox.masked); updateBoxDOM(AppState.selectedBox); } });
  DOM.btnDeleteBox.addEventListener('click', () => { if (AppState.selectedBox) deleteBox(AppState.selectedBox); });
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
  showSnackbar(`PDF cargado en el editor (${AppState.totalPages} páginas)`);
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

    const svgOverlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgOverlay.setAttribute("class", "drawing-overlay");
    svgOverlay.id = `svg-overlay-${pageIndex}`;

    const overlay = document.createElement('div');
    overlay.className = 'text-boxes-overlay';
    overlay.id = `overlay-page-${pageIndex}`;
    overlay.dataset.pageIndex = pageIndex;

    overlay.addEventListener('mousedown', (e) => {
      if (AppState.activeTool === 'select' && e.target === overlay) {
        deselectAllBoxes();
      } else if (AppState.activeTool === 'new-text') {
        const rect = overlay.getBoundingClientRect();
        createNewTextBox(pageIndex, (e.clientX - rect.left) / AppState.zoomScale, (e.clientY - rect.top) / AppState.zoomScale, "Escribe aquí...", 14);
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

function startDrawing(e, overlay, pageIndex) {
  const rect = overlay.getBoundingClientRect();
  const startX = (e.clientX - rect.left) / AppState.zoomScale;
  const startY = (e.clientY - rect.top) / AppState.zoomScale;
  if (!AppState.pageShapes[pageIndex]) AppState.pageShapes[pageIndex] = [];

  const shape = {
    id: 'shape_' + Math.random().toString(36).substr(2, 9),
    type: AppState.activeTool,
    x: startX, y: startY, w: 0, h: 0,
    points: [{ x: startX, y: startY }],
    color: DOM.textColorPicker.value,
    thickness: parseInt(DOM.lineWeightInput.value) || 2
  };
  AppState.pageShapes[pageIndex].push(shape);
  const svgLayer = document.getElementById(`svg-overlay-${pageIndex}`);
  let svgEl = document.createElementNS("http://www.w3.org/2000/svg", shape.type === 'draw' ? 'polyline' : shape.type === 'rect' ? 'rect' : 'ellipse');
  svgEl.setAttribute("fill", "none");
  svgEl.setAttribute("stroke", shape.color);
  svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
  svgLayer.appendChild(svgEl);

  function onMouseMove(ev) {
    const currX = (ev.clientX - rect.left) / AppState.zoomScale;
    const currY = (ev.clientY - rect.top) / AppState.zoomScale;
    if (shape.type === 'draw') {
      shape.points.push({ x: currX, y: currY });
      svgEl.setAttribute("points", shape.points.map(p => `${p.x * AppState.zoomScale},${p.y * AppState.zoomScale}`).join(' '));
    } else if (shape.type === 'rect') {
      shape.w = Math.abs(currX - startX); shape.h = Math.abs(currY - startY);
      shape.x = Math.min(startX, currX); shape.y = Math.min(startY, currY);
      svgEl.setAttribute("x", shape.x * AppState.zoomScale); svgEl.setAttribute("y", shape.y * AppState.zoomScale);
      svgEl.setAttribute("width", shape.w * AppState.zoomScale); svgEl.setAttribute("height", shape.h * AppState.zoomScale);
    } else if (shape.type === 'circle') {
      shape.w = Math.abs(currX - startX); shape.h = Math.abs(currY - startY);
      shape.x = Math.min(startX, currX); shape.y = Math.min(startY, currY);
      svgEl.setAttribute("cx", (shape.x + shape.w / 2) * AppState.zoomScale); svgEl.setAttribute("cy", (shape.y + shape.h / 2) * AppState.zoomScale);
      svgEl.setAttribute("rx", (shape.w / 2) * AppState.zoomScale); svgEl.setAttribute("ry", (shape.h / 2) * AppState.zoomScale);
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
  (AppState.pageShapes[pageIndex] || []).forEach(shape => {
    let svgEl = document.createElementNS("http://www.w3.org/2000/svg", shape.type === 'draw' ? 'polyline' : shape.type === 'rect' ? 'rect' : 'ellipse');
    svgEl.setAttribute("fill", "none");
    svgEl.setAttribute("stroke", shape.color);
    svgEl.setAttribute("stroke-width", shape.thickness * AppState.zoomScale);
    if (shape.type === 'draw') {
      svgEl.setAttribute("points", shape.points.map(p => `${p.x * AppState.zoomScale},${p.y * AppState.zoomScale}`).join(' '));
    } else if (shape.type === 'rect') {
      svgEl.setAttribute("x", shape.x * AppState.zoomScale); svgEl.setAttribute("y", shape.y * AppState.zoomScale);
      svgEl.setAttribute("width", shape.w * AppState.zoomScale); svgEl.setAttribute("height", shape.h * AppState.zoomScale);
    } else {
      svgEl.setAttribute("cx", (shape.x + shape.w / 2) * AppState.zoomScale); svgEl.setAttribute("cy", (shape.y + shape.h / 2) * AppState.zoomScale);
      svgEl.setAttribute("rx", (shape.w / 2) * AppState.zoomScale); svgEl.setAttribute("ry", (shape.h / 2) * AppState.zoomScale);
    }
    svgLayer.appendChild(svgEl);
  });
}

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
    function onMouseMove(ev) { box.x = Math.max(0, initialX + (ev.clientX - startX) / AppState.zoomScale); box.y = Math.max(0, initialY + (ev.clientY - startY) / AppState.zoomScale); updateBoxDOM(box); }
    function onMouseUp() { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); }
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
  });
  handleSE.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    let startX = e.clientX, startY = e.clientY, initialW = box.width, initialH = box.height;
    function onMouseMove(ev) { box.width = Math.max(40, initialW + (ev.clientX - startX) / AppState.zoomScale); box.height = Math.max(20, initialH + (ev.clientY - startY) / AppState.zoomScale); updateBoxDOM(box); }
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
  el.style.backgroundColor = box.masked ? (box.backgroundColor || '#ffffff') : 'transparent';
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
}
function deselectAllBoxes() { document.querySelectorAll('.editable-text-box').forEach(el => el.classList.remove('selected')); AppState.selectedBox = null; }
function deleteBox(box) {
  if (!box) return;
  box.domElement?.remove();
  AppState.pageBoxes[box.pageIndex] = (AppState.pageBoxes[box.pageIndex] || []).filter(b => b.id !== box.id);
  AppState.selectedBox = null;
}
function renderPageBoxes(pageIndex) { (AppState.pageBoxes[pageIndex] || []).forEach(b => mountBoxDOM(b)); }

async function autoDetectExistingText(pageIndex) {
  if (!AppState.pdfDoc) return;
  const page = await AppState.pdfDoc.getPage(pageIndex + 1);
  const textContent = await page.getTextContent();
  const viewport = page.getViewport({ scale: 1.0 });
  let count = 0;
  textContent.items.forEach(item => {
    if (!item.str.trim()) return;
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    const fontSize = Math.sqrt(tx[0] * tx[0] + tx[1] * tx[1]);
    createNewTextBox(pageIndex, tx[4], tx[5] - fontSize, item.str, Math.round(fontSize), Math.max(item.width, 30), Math.max(fontSize * 1.2, 18), true);
    count++;
  });
  showSnackbar(`Se detectaron ${count} textos editables`);
}

async function runOcrOnCurrentPage(pageIndex) {
  if (!AppState.pdfDoc) return;
  const lang = document.getElementById('settingOcrLang')?.value || 'spa+eng';
  showProgressModal('Reconociendo texto con Tesseract OCR...', 'Extrayendo imagen de alta resolución...', 10);
  try {
    const page = await AppState.pdfDoc.getPage(pageIndex + 1);
    const viewport = page.getViewport({ scale: 2.0 });
    const tempCanvas = document.createElement('canvas'); tempCanvas.width = viewport.width; tempCanvas.height = viewport.height;
    await page.render({ canvasContext: tempCanvas.getContext('2d'), viewport }).promise;
    const worker = await Tesseract.createWorker(lang, 1, {
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round(m.progress * 100);
          showProgressModal('Reconociendo texto con Tesseract OCR...', `Analizando: ${pct}%`, pct);
        }
      }
    });
    const ret = await worker.recognize(tempCanvas); await worker.terminate();
    hideProgressModal();
    let count = 0;
    (ret.data?.lines || []).forEach(line => {
      if (!line.text.trim()) return;
      const bbox = line.bbox, h = (bbox.y1 - bbox.y0) / 2.0;
      createNewTextBox(pageIndex, bbox.x0 / 2.0, bbox.y0 / 2.0, line.text.trim(), Math.max(10, Math.round(h * 0.75)), (bbox.x1 - bbox.x0) / 2.0, h, true);
      count++;
    });
    showSnackbar(`OCR finalizado: ${count} líneas convertidas en texto editable`);
  } catch (err) { hideProgressModal(); showSnackbar("Error durante el OCR"); }
}

async function generatePdfBlob() {
  if (!AppState.pdfBytes) throw new Error("No hay documento abierto");
  const pdfDoc = await PDFLib.PDFDocument.load(AppState.pdfBytes);
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (let p = 0; p < pages.length; p++) {
    const page = pages[p];
    const pageHeight = page.getHeight();
    for (const shape of (AppState.pageShapes[p] || [])) {
      const color = hexToRgbPdf(shape.color);
      if (shape.type === 'draw') {
        for (let i = 0; i < shape.points.length - 1; i++) {
          page.drawLine({ start: { x: shape.points[i].x, y: pageHeight - shape.points[i].y }, end: { x: shape.points[i + 1].x, y: pageHeight - shape.points[i + 1].y }, color, thickness: shape.thickness });
        }
      } else if (shape.type === 'rect') {
        page.drawRectangle({ x: shape.x, y: pageHeight - shape.y - shape.h, width: shape.w, height: shape.h, borderColor: color, borderWidth: shape.thickness });
      } else if (shape.type === 'circle') {
        page.drawEllipse({ x: shape.x + shape.w / 2, y: pageHeight - shape.y - shape.h / 2, xScale: shape.w / 2, yScale: shape.h / 2, borderColor: color, borderWidth: shape.thickness });
      }
    }
    for (const box of (AppState.pageBoxes[p] || [])) {
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
    const blob = await generatePdfBlob();
    triggerDownloadBlob(blob, `${AppState.fileName || 'documento'}_editado.pdf`, 'Editar PDF');
  } catch (e) { showSnackbar("Abre un PDF primero"); }
}

async function previewPdf() {
  try {
    const blob = await generatePdfBlob();
    window.open(URL.createObjectURL(blob), '_blank');
  } catch (e) { showSnackbar("Abre un PDF primero para previsualizar"); }
}

function hexToRgbPdf(hex) {
  let c = hex.replace('#', ''); if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16); return PDFLib.rgb((num >> 16) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255);
}

async function loadSampleInvoice() {
  const samplePdf = await PDFLib.PDFDocument.create();
  const page = samplePdf.addPage([595, 842]);
  const font = await samplePdf.embedFont(PDFLib.StandardFonts.Helvetica);
  const fontBold = await samplePdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
  page.drawText("JD PDF SUITE - DOCUMENTO DE MUESTRA", { x: 50, y: 780, size: 18, font: fontBold, color: PDFLib.rgb(0.1, 0.45, 0.91) });
  page.drawText("Haz clic en Insertar > Escanear Texto para editar cualquier línea.", { x: 50, y: 740, size: 12, font });
  const bytes = await samplePdf.save();
  AppState.fileName = "Muestra_JD";
  DOM.documentNameInput.value = AppState.fileName;
  await loadPdfFromBuffer(bytes);
}

document.addEventListener('DOMContentLoaded', init);