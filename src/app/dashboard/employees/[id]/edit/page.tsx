import { getEmployeeById } from '@/app/actions';
import EditeEmployeeProfile from '@/components/dashboard/employees/edit-employee-profile';
import * as React from 'react';

export interface IEditProfileProps {
    params:Promise<{id:string}>
}

export default async function EditProfile (params: IEditProfileProps) {
    const {id} = (await params.params)
    const data = await getEmployeeById(id)
  return (
    <div>
    <EditeEmployeeProfile data={data}/>
    </div>
  );
}
