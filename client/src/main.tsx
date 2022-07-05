import { Spin } from 'antd'
import 'antd/dist/antd.css'
import { RouterView } from 'oh-router-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterView
      router={router}
      splash={
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      }
    />
  </React.StrictMode>
)

