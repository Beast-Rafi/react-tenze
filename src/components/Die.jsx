export default function Die(prop) {
  return (
    <>
      <div
        onClick={() => prop.hold(prop.id)}
        className={`hover:cursor-pointer h-full w-full shadow-m font-bold p-3 ${prop.isHeld ? "bg-green-400" : "bg-white"} rounded-2xl align-middle justify-center`}
      >
        {prop.item}
      </div>
    </>
  );
}
