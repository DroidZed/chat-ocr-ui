build:
	docker build -t droidzed/chat_ocr .

dev:
	npm run dev

prod:
	docker volume create ollama_data
	docker volume create n8n_data
	docker volume create pg_data
	docker volume create beaver_data
	docker compose up -d

down:
	docker compose down
