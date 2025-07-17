import { SVGProps } from 'react';

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>ArrowDown</title>
      <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z" />
    </svg>
  );
}

export function OpenInNew(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>OpenInNew</title>
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
      />
    </svg>
  );
}

export function EditLocation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>EditLocation</title>
      <path
        fill="currentColor"
        d="M12 21.325q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q.675 0 1.338.113t1.287.312L9.575 7.5q-.275.275-.425.638T9 8.9V11q0 .825.588 1.412T11 13h2.1q.4 0 .763-.15t.637-.425l5.05-5.05q.225.65.337 1.35T20 10.2q0 2.35-1.7 5.037t-4.975 5.588q-.275.25-.625.375t-.7.125M18.35 3.85l.95.95l-5.9 5.9q-.15.15-.337.225t-.388.075h-.925q-.325 0-.537-.212T11 10.25v-.925q0-.2.075-.387T11.3 8.6l5.9-5.9zM20 4.1L17.9 2l.7-.7q.275-.275.7-.275t.7.275l.7.7q.275.275.275.7t-.275.7z"
      />
    </svg>
  );
}

export function Edit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>Edit</title>
      <path
        fill="currentColor"
        d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
      />
    </svg>
  );
}

export function Mapview(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>Mapview</title>
      <path
        fill="currentColor"
        d="M14.35 20.775L9 18.9l-4.65 1.8q-.25.1-.488.063t-.437-.163q-.2-.125-.312-.337T3 19.775V5.75q0-.325.188-.575T3.7 4.8l4.65-1.575q.15-.05.313-.075T9 3.125q.175 0 .338.025t.312.075L15 5.1l4.65-1.8q.25-.1.488-.062t.437.162q.2.125.313.338t.112.487V18.25q0 .325-.187.575t-.513.375l-4.65 1.575q-.15.05-.312.075t-.338.025q-.175 0-.337-.025t-.313-.075M14 18.55V6.85l-4-1.4v11.7z"
      />
    </svg>
  );
}

export function Warn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <title>Info</title>
      <path
        fill="currentColor"
        d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11q-.425 0-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
      />
    </svg>
  );
}
