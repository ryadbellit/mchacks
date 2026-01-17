import './App.css'
import Chat from './components/chat'
import CodeBlock from './components/code_block'
import Header from './components/header'
import CameraPanel from './components/camera_panel'
import TestPanel from './components/test_panel'


function App() {

  return (
    <>
      <Header />
      <main>
        <div className="component-wrapper">
          <Chat />
        </div>
        <div className="component-wrapper">
          <CodeBlock />
        </div>
        <div className="sidebar-column">
          <div className="component-wrapper">
            <CameraPanel />
          </div>
          <div className="component-wrapper">
            <TestPanel />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
