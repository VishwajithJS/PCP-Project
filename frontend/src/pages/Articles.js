return (
    <div style={{ padding: "20px" }}>
        <h2>🌍 Published Articles</h2>

        {articles.map(a => (
            <div key={a._id} style={{
                background: "white",
                padding: "15px",
                margin: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
                <h3>{a.title}</h3>
                <p>{a.content}</p>
            </div>
        ))}
    </div>
)