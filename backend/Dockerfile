FROM python:3.11-slim

WORKDIR /app

RUN adduser --disabled-password --gecos '' appuser \
    && mkdir -p /app/data \
    && chown -R appuser:appuser /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY app /app/app

USER appuser

ENV PYTHONPATH=/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
