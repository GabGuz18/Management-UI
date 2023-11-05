import React, { useState } from 'react'
import { Button } from '@carbon/react'
import './salesStyles.scss';

export const Sales = () => {

  const [isFormOpen, setIsFormOpen] = useState(false)

  const formOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <>
      <div className='container'>
        <div>
          <h1>Sales</h1>
        </div>
        <div>
          {
            isFormOpen ? (
              <Button 
                iconDescription='Cancel'
                kind='secondary'
                onClick={() => { formOpen() }}
              >
                Cancel
              </Button>
            ) : (
              <Button 
                iconDescription='Add new sale'
                onClick={() => { formOpen() }}
              >
                Add +
              </Button>
            )
          }
        </div>
      </div>
      <div>
        {
          isFormOpen && (
            <div>
              
            </div>
          )
        }
      </div>
    </>
  )
}
