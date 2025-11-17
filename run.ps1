param (
    [string]$Action
)

function SetupCompose() {
    docker volume create ollama_data
    docker volume create n8n_data
    docker volume create pg_data

    docker compose up -d
}

function TearDown() {
    docker compose down
}

switch ($Action) {
    "UP" { SetupCompose }
    "DOWN" { TearDown}
    default { Write-Host "Invalid action. Required: UP or DOWN." }
}
