import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import MainLayout from './pages/Layouts/MainLayout.tsx'
import TopicIndex from './pages/Topics/TopicIndex.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<App />} />
                        <Route path="/topics/:subjectHeading" element={<TopicIndex />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
)
