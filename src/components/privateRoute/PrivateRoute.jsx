import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export function PrivateRoute() {
  const token = localStorage.getItem('token')
  const location = useLocation()
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
