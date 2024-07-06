#!/usr/bin/env bash

ollama serve &
ollama list
ollama pull nomic-embed-text

ollama serve &
ollama list
ollama pull mistral