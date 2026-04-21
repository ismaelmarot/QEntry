const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { spawn } = require('child_process')
const url = require('node:url')

let backendProcess = null

function startBackend() {
  const backendPath = path.join(__dirname, 'backend', 'index.js')
  const nodeModulesPath = path.join(process.resourcesPath, 'node_modules')
  
  const env = { 
    ...process.env, 
    NODE_PATH: nodeModulesPath
  }
  
  console.log('Starting backend from:', backendPath)
  console.log('NODE_PATH:', nodeModulesPath)
  
  backendProcess = spawn('node', [backendPath], {
    stdio: 'inherit',
    detached: false,
    env: env
  })
  
  backendProcess.on('error', (err) => {
    console.error('Backend error:', err.message)
  })
  
  backendProcess.on('exit', (code) => {
    console.log('Backend exited with code:', code)
  })
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
try {
  if (require('electron-squirrel-startup')) {
    app.quit()
  }
} catch (e) {
  // electron-squirrel-startup not available
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  
  // Disable GPU acceleration to avoid issues
  mainWindow.webContents.session.setUserAgent(
    mainWindow.webContents.session.getUserAgent() + ' --disable-gpu'
  )

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    // When packaged, __dirname = Contents/Resources/app
    const indexPath = path.join(__dirname, 'frontend', 'dist', 'index.html')
    const indexUrl = url.format({
      pathname: indexPath,
      protocol: 'file:',
      slashes: true
    })
    console.log('Loading frontend from:', indexUrl)
    mainWindow.loadURL(indexUrl)
    
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.error('Failed to load:', errorCode, errorDescription)
    })
    
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('Page loaded successfully')
    })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Start backend server
  startBackend()
  
  // Wait a bit for backend to start, then create window
  setTimeout(() => {
    createWindow()
  }, 2000)

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})