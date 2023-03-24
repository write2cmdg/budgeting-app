import React from 'react'
import { Form, useFetcher } from 'react-router-dom'

//library imports
import { UserPlusIcon } from '@heroicons/react/24/solid'

//Assets imports

import illustration from '../assets/illustration.jpg'

const Intro = () => {

    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

  return (
    <div className='intro'>
        <div>
            <h1>
                Take control of <span className='accent'>Your Money</span>
            </h1>
            <p>
                Personal budgeting is the key to financial freedom. Unlock your potencial today.
            </p>
            <fetcher.Form method='post'>
                <input 
                type="text" 
                name='userName' 
                required placeholder='What is your name?' 
                aria-label='Your Name' 
                autoComplete='given-name'
                />
                <input type="hidden" name="_action" value="newUser" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Submitting...</span> : (
                        <>
                           <span>Create Account</span>
                           <UserPlusIcon width={20} />
                        </>
                    )
                }
            </button>
            </fetcher.Form>
        </div>
        <img src={illustration} alt="person with money" width={450}/>
    </div>
  )
}

export default Intro