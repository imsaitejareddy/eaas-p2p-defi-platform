FROM python:3.11-slim
WORKDIR /app
COPY ai-ml/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY ai-ml/app ./app
COPY ai-ml/model ./model
COPY ai-ml/sample_data ./sample_data
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9000"]
