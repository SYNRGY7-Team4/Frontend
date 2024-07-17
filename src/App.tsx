import { Route, Routes, useLocation } from "react-router-dom"
import Button from "@/components/Button/Button"
import { Login } from "@/pages"
import AturPin from "./pages/Register/AturPin"
import Password from "./pages/Register/Password"

function App() {
  const location = useLocation()

  return (
    <>
      <Routes key={location.pathname} location={location}>
        <Route
          path='/'
          element={
            <>
              <div className='text-secondary-red shadow-03'>Hello World</div>

              <Button
                variant='primary'
                className='bg-primary-darkBlue'
                disabled={false}
                size='md'
              >
                Custom Button
              </Button>
            </>
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/atur-pin' element={<AturPin />} />
        <Route path='/password' element={<Password/>}/>

      </Routes>
    </>
  )
}

export default App
