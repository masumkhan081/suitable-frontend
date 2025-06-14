'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { thead1, tbody1, tbody2 } from './data'
import { Circle } from 'lucide-react'

export default function Page() {
  //
  const [data, setdata] = useState(tbody1)

  //
  return (
    <div className="flex flex-col gap-4 w-full h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1>Test Purpose responsive Table</h1>
        <div className="flex gap-2">
          <Button onClick={() => setdata(tbody1)}>Tab 1</Button>
          <Button onClick={() => setdata(tbody2)}>Tab 2</Button>
        </div>
      </div>

      <div className="overflow-x-auto w-full px-2  overflow-y-auto">
        <table className="table-auto relative bg-gray-100 min-w-full overflow-y-auto">
          <thead className=" sticky bg-white z-10  top-0 left-0 right-0 ">
            <tr className="bg-white pt-2">
              {thead1.map((header, index) => (
                <th
                  key={index}
                  className="whitespace-nowrap px-4 py-2 text-left border border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="relative top-10 z-0 border-b border-gray-300 mt-2">
            {data.map((item, index) => (
              <tr className="h-auto border-b border-gray-300" key={index}>
                <td className="whitespace-nowrap px-4 py-2">{item['First Name']}</td>
                <td className="whitespace-nowrap px-4 py-2">{item['Last Name']}</td>
                <td className="whitespace-nowrap px-4 py-2">{item['Age']}</td>
                <td className="whitespace-nowrap px-4 py-2">{item['Gender']}</td>
                <td className="whitespace-nowrap px-4 py-2">{item['Email']}</td>
                <td className=" px-4 py-2 min-w-[165px]">{item['Phone']}</td>
                <td className=" px-4 py-2">{item['Address']}</td>
                <td className=" px-4  min-w-auto whitespace-nowrap">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="flex items-center gap-2">
                      {' '}
                      <span>{item['Status'].ageVerified ? <Positive /> : <Negative />}</span>
                      <span className="font-semibold">Age Verification</span>{' '}
                    </span>
                    <span className="flex items-center gap-2">
                      {' '}
                      <span>{item['Status'].incomeVerified ? <Positive /> : <Negative />}</span>
                      <span className="font-semibold">Income Verification</span>{' '}
                    </span>
                    <span className="flex items-center gap-2">
                      {' '}
                      <span>{item['Status'].identityVerified ? <Positive /> : <Negative />}</span>
                      <span className="font-semibold">Identity Verification</span>{' '}
                    </span>
                  </div>
                </td>
                <td className=" px-4 py-2">{item['Revenue']}</td>
                <td className=" px-4 py-2">{item['Rent']}</td>
                <td className=" px-4 py-2">{item['Deposit']}</td>
                <td className=" px-4 py-2">{item['Total']}</td>

                <td className=" px-4 py-2">
                  <div className="flex gap-2 items-center">
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const Positive = () => {
  return <Circle className="bg-green-600 text-white w-4 h-4 rounded-full" />
}

export const Negative = () => {
  return <Circle className="bg-red-600 text-white w-4 h-4 rounded-full" />
}
