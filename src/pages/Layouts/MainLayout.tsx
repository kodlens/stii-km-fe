import { Header } from './Header'
import { Footer } from './Footer'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default MainLayout