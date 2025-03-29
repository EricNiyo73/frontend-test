# PDF Annotator

A web application for viewing, annotating, and editing PDF documents.

## Features

- Upload and view PDF documents
- Add highlights, underlines, comments, and signatures
- Zoom and page navigation
- Export annotated PDFs

## Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/EricNiyo73/frontend-test.git
   cd frontend-test
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Libraries Used

- **Next.js & React**: UI framework
- **TypeScript**: Type safety
- **pdf-lib**: PDF modification
- **pdfjs-dist**: PDF rendering
- **Tailwind CSS**: Styling
- **react-dropzone**: File upload

## Challenges Solved

- **PDF.js Loading**: Created separate initialization file
- **Coordinate Mapping**: Implemented screen-to-PDF coordinate transformation
- **Server Rendering**: Used Next.js dynamic imports with `ssr: false`

## Future Enhancements

- Drawing tools
- Text annotations
- Annotation management UI
- Collaboration features
- Form filling support
- Cloud storage integration
