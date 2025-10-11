package main

import (
    "embed"
    "fmt"
    "log"
    "net/http"
    "os/exec"
    "runtime"
    "time"
)

//go:embed index.html app.js pip.js style.css
var content embed.FS

func main() {
    port := "8000"
    
    // Serve files
    http.Handle("/", http.FileServer(http.FS(content)))
    
    // Open browser after short delay
    url := fmt.Sprintf("http://localhost:%s", port)
    go func() {
        time.Sleep(500 * time.Millisecond)
        openBrowser(url)
    }()
    
    fmt.Printf("🎥 HangVidU running at %s\n", url)
    fmt.Println("Keep this window open. Close to stop server.")
    
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

func openBrowser(url string) {
    var cmd string
    var args []string

    switch runtime.GOOS {
    case "windows":
        cmd = "cmd"
        args = []string{"/c", "start", url}
    case "darwin":
        cmd = "open"
        args = []string{url}
    default:
        cmd = "xdg-open"
        args = []string{url}
    }

    if err := exec.Command(cmd, args...).Start(); err != nil {
        fmt.Printf("Please open %s in your browser\n", url)
    }
}