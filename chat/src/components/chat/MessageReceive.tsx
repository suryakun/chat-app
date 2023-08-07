import { format } from "date-fns";

function MessageReceive({ sender, text, datetime }: { sender: string, text: string; datetime: Date }) {
  return (
    <div className="flex align-middle p-3 mt-2 flex-col">
      <p className="text-sm">{sender}</p>
      <div className="receiver p-2 w-fit flex flex-col bg-grey rounded-lg">
        <span className="flex-wrap text-md w-full">{text}</span>
        <span className="text-sm text-left pt-2 w-full">{format(datetime, 'dd/MM/yyyy')}</span>
      </div>
    </div>
  );
}

export default MessageReceive;
