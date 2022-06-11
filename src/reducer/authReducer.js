function authReducer(state, action) {
    switch (action.type) {
        case 'FIRST_NAME':
            return {...state, firstName: action.payload }
        case 'LAST_NAME':
            return {...state, lastName: action.payload }
        case 'EMAIL':
            return {...state, email: action.payload }
        case 'PASSWORD':
            return {...state, password: action.payload }
        case 'CONFIRM_PASSWORD':
            return {...state, confirmPassword: action.payload }
        case 'FILL_DUMMY_DETAILS':
            return {
                ...state,
                firstName: 'Prasad',
                lastName: 'Rohit',
                email: 'rohit@neog.com',
                password: 'rohit123456*',
                confirmPassword: 'rohit123456*',
            }
        default:
            return {...state }
    }
}
export { authReducer }