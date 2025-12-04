import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
    <Outlet />


    <div>this is auth footer</div>
    </>
  )
}
