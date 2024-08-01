const key = import.meta.env.VITE_API_KEY

function App() {
  console.log("KEY", key)
  return (
    <>
      <h1 className="text-red-400">Weather Wear</h1>
    </>
  )
}

export default App
