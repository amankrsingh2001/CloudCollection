import { Outlet } from 'react-router-dom'
import './App.css'
import { RecoilRoot } from 'recoil'

function App() {


  return (
    <div className='w-screen'>
    <RecoilRoot>
            <Outlet>
            </Outlet>
    </RecoilRoot>
    </div>
  )
}

export default App
