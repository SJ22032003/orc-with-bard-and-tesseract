# ORC with Tesseract and Bard AI

This repository provides two methods for extracting image data using Tesseract OCR and Bard AI.

## File Structure
```
├── orc-with-bard-and-tesseract
│   ├── bard
│   ├── tesseract
└── README.md
```

## Tesseract OCR Method

### Prerequisites
Make sure you have Tesseract installed on your machine. If not, you can download it from [Tesseract GitHub](https://github.com/tesseract-ocr/tesseract).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/SJ22032003/orc-with-bard-and-tesseract.git
   cd ./orc-with-bard-and-tesseract/tesseract
   ```

2. Install dependencies:
   ```bash
   npm i
   ```
   
3. Run the server:
   ```bash
   npm start
   ```
4. Server will start on `localhost:8082`. Check on your web browser.

### Caution
Tesseract does support handwriting detection out of the box and will be difficult to extract sanitizable information from raw data. Depending on the use cause, this issue will be a blocker for most industrial usage.

<hr/>

## Bard AI Method

### Prerequisites
Make sure to have <strong>NodeJs version 18 or above</strong>. 
Use nvm for node version management.

### Steps
1. Clone the repository (if not already cloned):
   ```bash
   git clone https://github.com/SJ22032003/orc-with-bard-and-tesseract.git
   cd ./orc-with-bard-and-tesseract/tesseract
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Use node v18 or above (optional if you have nvm)
   ```bash
   nvm use
   ```
   
4. Run the server:
   ```bash
   npm start
   ```
5. Server will start on `localhost:8081`. Check on your browser.

### Caution
Bard have free to use teir and provides simple integration. Bard can be better altenative for image data extraction but it will fall short will data accuracy of 100% is your desired goal. Advicable to use in small projects.
 
<hr/>

# Amazon Textract (Best option)

Amazon Textract is a fully managed machine learning service by AWS designed for extracting structured data from documents. Key features include:

- **Automatic Document Understanding**: Textract comprehends document content and structure, identifying tables, forms, and text blocks.

- **Versatile Document Processing**: Supports various document types, including PDFs and images, with high accuracy in extracting printed and handwritten text.

- **Table and Form Extraction**: Extracts tabular data and key-value pairs, maintaining relationships and structure.

- **Scalability**: Easily scales to handle varying workloads, making it suitable for processing large volumes of documents.

**Advantages Over Tesseract and Other Tools like tesseract:**

1. **Automatic Understanding**: Textract goes beyond OCR, automatically understanding document structure and content.

2. **Structured Data Extraction**: It excels in extracting structured data, including tables and forms, maintaining relationships.

3. **Scalability and Cost-effectiveness**: Textract scales effortlessly and follows a pay-as-you-go pricing model, making it cost-effective for both small and large-scale processing.

In summary, Amazon Textract stands out for its automatic understanding of document content, versatility, structured data extraction capabilities. Its best for usage when it comes to industry projects.

