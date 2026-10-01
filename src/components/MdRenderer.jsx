import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MdRenderer({ content }) {
  return (
    <div className="md-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
