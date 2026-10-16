/**
 * JD PDF Editor & Suite - Super App 100% Local (Client-Side)
 * Incluye Editor de PDF Completo + Las 18 Herramientas de iLovePDF con flujos interactivos
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
    desc: 'Convierte y ordena varias imágenes JPG, PNG o WebP en un documento PDF.',
    icon: 'image',
    bg: '#fef7e0',
    color: '#f29900',
    accept: 'image/*',
    multiple: true,
    actionLabel: 'Convertir a PDF'
  },
  {
    id: 'word-to-pdf',
    title: 'Word a PDF',
    desc: 'Convierte documentos de Microsoft Word (.docx) a formato PDF.',
    icon: 'description',
    bg: '#e8f0fe',
    color: '#2b579a',
    accept: '.docx',
    multiple: false,
    actionLabel: 'Convertir a PDF'
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel a PDF',
    desc: 'Convierte hojas de cálculo (.xlsx, .xls, .csv) en tablas PDF listas para imprimir.',
    icon: 'table_chart',
    bg: '#e6f4ea',
    color: '#217346',
    accept: '.xlsx,.xls,.csv',
    multiple: false,
    actionLabel: 'Convertir a PDF'
  },
  {
    id: 'ppt-to-pdf',
    title: 'PowerPoint a PDF',
    desc: 'Extrae el contenido de presentaciones (.pptx) y conviértelo en páginas PDF.',
    icon: 'slideshow',
    bg: '#fce8e6',
    color: '#d24726',
    accept: '.pptx',
    multiple: false,
    actionLabel: 'Convertir a PDF'
  },
  {
    id: 'compress-pdf',
    title: 'Comprimir PDF',
    desc: 'Reduce el peso de tu archivo PDF optimizando flujos y resolución de página.',
    icon: 'compress',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Comprimir PDF'
  },
  {
    id: 'merge-pdf',
    title: 'Fusionar PDF',
    desc: 'Une varios archivos PDF y arrastra sus tarjetas para definir el orden exacto.',
    icon: 'call_merge',
    bg: '#fce8e6',
    color: '#ea4335',
    accept: '.pdf',
    multiple: true,
    actionLabel: 'Fusionar PDF'
  },
  {
    id: 'pdf-to-word',
    title: 'PDF a Word',
    desc: 'Convierte tus PDF a documentos Word editables con o sin reconocimiento OCR.',
    icon: 'article',
    bg: '#e8f0fe',
    color: '#2b579a',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Convertir a Word'
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF a Excel',
    desc: 'Extrae tablas del PDF a Excel (.xlsx) con opción de OCR y control de hojas.',
    icon: 'grid_on',
    bg: '#e6f4ea',
    color: '#217346',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Convertir a Excel'
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF a PowerPoint',
    desc: 'Convierte cada página de tu PDF en una diapositiva de alta resolución (.pptx).',
    icon: 'co_present',
    bg: '#fce8e6',
    color: '#d24726',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Convertir a PPTX'
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF a JPG',
    desc: 'Extrae todas las páginas de tu PDF como imágenes JPG de alta calidad.',
    icon: 'photo_library',
    bg: '#fef7e0',
    color: '#f9ab00',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Convertir a JPG'
  },
  {
    id: 'split-pdf',
    title: 'Dividir PDF',
    desc: 'Separa por rangos personalizados, rangos fijos o seleccionando páginas específicas.',
    icon: 'call_split',
    bg: '#fce8e6',
    color: '#ea4335',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Dividir PDF'
  },
  {
    id: 'page-numbers',
    title: 'Números de página',
    desc: 'Inserta numeración automática en tus páginas PDF eligiendo posición y formato.',
    icon: 'format_list_numbered',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Numerar PDF'
  },
  {
    id: 'watermark-pdf',
    title: 'Marca de agua',
    desc: 'Estampa un texto o sello diagonal semitransparente sobre todas las páginas del PDF.',
    icon: 'branding_watermark',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Aplicar Marca'
  },
  {
    id: 'rotate-pdf',
    title: 'Rotar PDF',
    desc: 'Gira todas las páginas de tu PDF 90°, 180° o 270° de manera permanente.',
    icon: 'rotate_right',
    bg: '#f3e8fd',
    color: '#9334e6',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Rotar PDF'
  },
  {
    id: 'unlock-pdf',
    title: 'Desbloquear PDF',
    desc: 'Elimina restricciones y recrea una copia limpia del PDF proporcionando su clave.',
    icon: 'lock_open',
    bg: '#e8f0fe',
    color: '#1967d2',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Desbloquear PDF'
  },
  {
    id: 'repair-pdf',
    title: 'Reparar PDF',
    desc: 'Reconstruye la tabla de referencias cruzadas y flujos dañados de un PDF.',
    icon: 'build_circle',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Reparar PDF'
  },
  {
    id: 'protect-pdf',
    title: 'Proteger PDF',
    desc: 'Aplica sello de seguridad, metadatos blindados y bloqueo de edición al documento.',
    icon: 'shield_lock',
    bg: '#e8f0fe',
    color: '#1967d2',
    accept: '.pdf',
    multiple: false,
    actionLabel: 'Proteger PDF'
  },
  {
    id: 'ocr-pdf',
    title: 'OCR PDF',
    desc: 'Reconoce texto en PDFs escaneados con Tesseract.js y genera un PDF editable.',
    icon: 'document_scanner',
    bg: '#e6f4ea',
    color: '#34a853',
    accept: '.pdf',
    multiple: false,
    badge: 'Pro Local',
    actionLabel: 'Aplicar OCR'
  }
];

/* ==========================================================================
   ESTADO GLOBAL DE LA APLICACIÓN Y CONFIGURACIÓN INTERMEDIA (iLovePDF UX)
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
  modalFileMeta: [], // Guarda { id, file, pageCount, thumbCanvas }
  draggedFileIndex: null,
  recentHistory: [],

  // Configuración específica de las herramientas intermedias
  toolConfig: {
    // Dividir PDF
    splitMainTab: 'range',         // 'range' | 'pages'
    splitRangeType: 'custom',      // 'custom' | 'fixed'
    splitCustomRanges: [{ from: 1, to: 1 }],
    splitMergeRanges: false,
    splitFixedStep: 1,
    splitPagesMode: 'all',         // 'all' | 'select'
    splitSelectedPages: new Set(),
    splitMergeSelected: false,
    splitLoadedPdfDoc: null,
    splitTotalPages: 1,

    // PDF a Word
    wordOcrMode: 'no-ocr',         // 'no-ocr' | 'ocr'

    // PDF a Excel
    excelOcrMode: 'no-ocr',        // 'no-ocr' | 'ocr'
    excelSheetMode: 'single'       // 'single' (todo en una hoja) | 'multiple' (hojas separadas)
  }
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
  dropzonePromptText: document.getElementById('dropzonePromptText'),
  dropzoneAcceptedFormats: document.getElementById('dropzoneAcceptedFormats'),
  toolFileInput: document.getElementById('toolFileInput'),
  btnSelectToolFiles: document.getElementById('btnSelectToolFiles'),
  btnSelectFilesLabel: document.getElementById('btnSelectFilesLabel'),
  toolSelectedFilesList: document.getElementById('toolSelectedFilesList'),
  toolDynamicOptions: document.getElementById('toolDynamicOptions'),
  modalFooterHint: document.getElementById('modalFooterHint'),
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
  DOM.ocrProgressFill.style.width = `\${pct}%`;
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
      \${tool.badge ? `<span class="tool-premium-pill">${tool.badge}</span>` : ''}
      <div class="tool-badge-icon" style="background:${tool.bg}; color:${tool.color};">
        <span class="material-symbols-outlined">\${tool.icon}</span>
      </div>
      <div class="tool-card-title">\${tool.title}</div>
    `;
    card.addEventListener('click', () => openSuiteTool(tool));
    DOM.toolsGridContainer.appendChild(card);
  });
}

function setupDashboardEvents() {
  DOM.toolSearchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = TOOLS_CATALOG.filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
    renderHomeToolsGrid(filtered);
  });

  DOM.btnToggleViewMode.addEventListener('click', () => {
    DOM.toolsGridContainer.classList.toggle('list-mode');
  });

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
        <strong>\${item.name}</strong>
        <p style="font-size:12px; color:#5f6368;">${item.toolTitle} •${item.date}</p>
      </div>
      <a href="${item.url}" download="${item.name}" class="g-btn-outlined" style="text-decoration:none;">Descargar</a>
    </div>
  `).join('');
}

/* ==========================================================================
   MODAL UNIVERSAL Y OPCIONES INTERACTIVAS ESTILO ILOVEPDF
   ========================================================================== */
function resetToolConfigDefaults() {
  AppState.toolConfig = {
    splitMainTab: 'range',
    splitRangeType: 'custom',
    splitCustomRanges: [{ from: 1, to: 1 }],
    splitMergeRanges: false,
    splitFixedStep: 1,
    splitPagesMode: 'all',
    splitSelectedPages: new Set([1]),
    splitMergeSelected: false,
    splitLoadedPdfDoc: null,
    splitTotalPages: 1,
    wordOcrMode: 'no-ocr',
    excelOcrMode: 'no-ocr',
    excelSheetMode: 'single'
  };
}

function openSuiteTool(tool) {
  if (tool.directEditor) {
    switchMainView('editor');
    return;
  }

  resetToolConfigDefaults();
  AppState.activeSuiteTool = tool;
  AppState.modalFiles = [];
  AppState.modalFileMeta = [];

  DOM.modalToolIconWrap.style.background = tool.bg;
  DOM.modalToolIconWrap.style.color = tool.color;
  DOM.modalToolIconWrap.innerHTML = `<span class="material-symbols-outlined">\${tool.icon}</span>`;
  DOM.modalToolTitle.textContent = tool.title;
  DOM.modalToolDesc.textContent = tool.desc;
  DOM.dropzoneAcceptedFormats.textContent = `Formatos admitidos: \${tool.accept}`;
  DOM.toolFileInput.accept = tool.accept;
  DOM.toolFileInput.multiple = !!tool.multiple;
  DOM.toolFileInput.value = '';
  DOM.toolSelectedFilesList.innerHTML = '';
  DOM.btnExecuteToolText.textContent = tool.actionLabel || 'Procesar y Descargar';
  DOM.btnExecuteToolAction.disabled = true;

  updateDropzoneCompactState();
  renderToolSpecificOptions(tool.id);
  DOM.toolWorkspaceModal.classList.add('show');
}

function updateDropzoneCompactState() {
  const hasFiles = AppState.modalFiles.length > 0;
  const isMulti = !!AppState.activeSuiteTool?.multiple;

  if (hasFiles) {
    DOM.toolDropzone.classList.add('compact-mode');
    DOM.dropzonePromptText.textContent = isMulti
      ? `\${AppState.modalFiles.length} archivo(s) listos. Puedes añadir más o arrastrar para ordenar.`
      : `Archivo cargado correctamente. Puedes cambiarlo si lo deseas.`;
    DOM.btnSelectFilesLabel.textContent = isMulti ? 'Añadir más archivos' : 'Cambiar archivo';
  } else {
    DOM.toolDropzone.classList.remove('compact-mode');
    DOM.dropzonePromptText.textContent = 'Selecciona o arrastra tus archivos aquí';
    DOM.btnSelectFilesLabel.textContent = 'Seleccionar archivos';
  }
}

/* ==========================================================================
   GESTIÓN DE ARCHIVOS CARGADOS Y TARJETAS ARRASTRABLES (FUSIONAR PDF)
   ========================================================================== */
function setupToolModalEvents() {
  const closeModal = () => DOM.toolWorkspaceModal.classList.remove('show');
  DOM.btnCloseToolModal.addEventListener('click', closeModal);
  DOM.btnCancelToolModal.addEventListener('click', closeModal);

  DOM.btnSelectToolFiles.addEventListener('click', () => DOM.toolFileInput.click());
  DOM.toolFileInput.addEventListener('change', async (e) => {
    if (!e.target.files.length) return;
    await handleIncomingModalFiles(Array.from(e.target.files));
    DOM.toolFileInput.value = '';
  });

  DOM.toolDropzone.addEventListener('dragover', (e) => { e.preventDefault(); });
  DOM.toolDropzone.addEventListener('drop', async (e) => {
    e.preventDefault();
    if (!e.dataTransfer.files.length) return;
    await handleIncomingModalFiles(Array.from(e.dataTransfer.files));
  });

  DOM.btnExecuteToolAction.addEventListener('click', executeActiveSuiteTool);
}

async function handleIncomingModalFiles(incomingFiles) {
  const tool = AppState.activeSuiteTool;
  if (!tool) return;

  if (tool.multiple) {
    for (const file of incomingFiles) {
      const meta = await buildFilePreviewMeta(file);
      AppState.modalFileMeta.push(meta);
    }
    AppState.modalFiles = AppState.modalFileMeta.map(m => m.file);
  } else {
    const first = incomingFiles[0];
    const meta = await buildFilePreviewMeta(first);
    AppState.modalFileMeta = [meta];
    AppState.modalFiles = [first];

    // Si es Dividir PDF, inspeccionamos páginas reales para inicializar rangos y miniaturas
    if (tool.id === 'split-pdf') {
      await initializeSplitPdfDocument(first);
    }
  }

  updateDropzoneCompactState();
  renderModalSelectedFiles();
  renderToolSpecificOptions(tool.id);
  updateExecuteButtonState();
}

async function buildFilePreviewMeta(file) {
  const meta = {
    id: 'fileHe actualizado la arquitectura del modal flotante y los motores de procesamiento en **`styles.css`**[cite: 1] y **`app.js`**[cite: 4] para replicar la experiencia interactiva de **iLovePDF**, manteniendo el diseño Material Design 3 y asegurando que todos los controles, botones, campos y listas desplegables (`select`, `option`) utilicen la misma familia tipográfica de la aplicación[cite: 1].

### Principales mejoras implementadas:
* **Tipografía unificada en controles y desplegables:** Se aplicó `font-family: inherit` a todos los elementos `input`, `select`, `option`, `button` y `textarea`, además de estilizar los selectores con iconos vectoriales personalizados compatibles con el diseño general.
* **Fusionar PDF con tarjetas arrastrables (Drag & Drop):** Al cargar múltiples archivos PDF, se genera una cuadrícula de tarjetas interactivas con vista previa en miniatura de la primera página, insignia con el número de orden, conteo de páginas y soporte tanto para arrastrar y soltar en escritorio como botones rápidos (`◀` `▶`) para reordenar cómodamente desde dispositivos móviles.
* **Dividir PDF con modos avanzados tipo iLovePDF:**
  * **Por rango de páginas:** Permite alternar entre **Rango personalizado** (añadir múltiples rangos independientes con opción de fusionarlos en un único PDF o descargarlos separados en un ZIP) y **Rango fijo** (dividir el documento automáticamente cada $N$ páginas).
  * **Por páginas:** Permite alternar entre **Extraer todas las páginas** o **Seleccionar páginas**, mostrando una cuadrícula interactiva con miniaturas de cada página del documento para marcar o desmarcar visualmente con un clic o mediante entrada de texto (ej. `1, 3, 5-8`).
* **PDF a Word (Sin OCR vs. Con OCR):** Incorpora tarjetas de selección visual para elegir entre extracción rápida de texto nativo o reconocimiento óptico con **Tesseract.js** para documentos escaneados.
* **PDF a Excel (OCR + Disposición de hojas):** Permite elegir entre conversión con o sin OCR y definir la estructura del libro `.xlsx` resultante: **Todo en una sola hoja** (consolidado continuo) o **Hojas separadas** (una pestaña por cada página del PDF).

---

### 1. Archivo `styles.css` actualizado

Reemplaza el contenido de tu archivo `styles.css