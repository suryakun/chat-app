import { format } from "date-fns";

function MessageSend({ text, datetime }: { text: string; datetime: Date }) {
  return (
    <div className="flex w-full justify-end align-middle p-3 mt-2 relative">
      <div className="sender p-2 flex flex-col bg-green rounded-lg">
        <span className="text-white flex-wrap text-md text-left">{text}</span>
        <span className="text-white text-sm text-right pt-2">
          {format(datetime, 'dd/MM/yyyy')}
        </span>
      </div>
    </div>
  );
}

export default MessageSend;
