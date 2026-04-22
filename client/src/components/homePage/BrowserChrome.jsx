export default function BrowserChrome({ url }) {
  return (
    <div className="bg-neutral-100 h-8 flex items-center px-3 gap-2">
      <span className="w-3 h-3 rounded-full bg-red-400" />
      <span className="w-3 h-3 rounded-full bg-yellow-400" />
      <span className="w-3 h-3 rounded-full bg-green-400" />
      <div className="ml-2 flex-1 bg-white rounded text-xs text-neutral-400 px-2 py-0.5 max-w-52">
        {url}
      </div>
    </div>
  )
}
