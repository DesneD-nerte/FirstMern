const Output = () => {
    return (
        <button onSubmit={e => localStorage.removeItem('token')}>
            Выйти
        </button>
    )
}

export default Output;