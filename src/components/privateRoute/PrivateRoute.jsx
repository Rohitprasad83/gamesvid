import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PrivateRoute() {
  const { encodedToken } = useSelector(state => state.auth)

  const location = useLocation()
  return encodedToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
