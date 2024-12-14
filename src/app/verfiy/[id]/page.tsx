import { Params } from 'next/dist/server/request/params';
import * as React from 'react';

export interface IVerfiyEmailProps {
    params:Promise<{ id: string }>
}

export default async  function VerfiyEmail ({params}: IVerfiyEmailProps) {
    const clientId = (await params).id
    console.log(clientId)
  return (
    <div>
      
    </div>
  );
}
