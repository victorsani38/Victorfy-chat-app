import React from 'react'
import { Link } from 'react-router-dom'
import { LANGUAGE_TO_FLAG } from '../constants'

const FriendCard = ({friend}) => {
  return (
<div className='card bg-base-200 hover:shadow-md transition-shadow'>
  <div className='card-body p-4'>
    {/* Avatar + Name */}
    <div className='flex items-center gap-3 mb-2'>
      <div className='avatar'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
          <img
            src={friend.profilePic}
            alt={friend.fullName}
            className='object-cover w-full h-full'
          />
        </div>
      </div>
      <h3 className='font-semibold truncate text-lg'>{friend.fullName}</h3>
    </div>

    {/* Languages – always under name */}
    <div className='flex flex-wrap gap-2 mb-3'>
      {friend.nativeLanguage && (
        <span className='badge badge-secondary text-xs flex items-center gap-1'>
          {getLanguageFlag(friend.nativeLanguage)}
          <span className='truncate'>Native: {friend.nativeLanguage}</span>
        </span>
      )}
      {friend.learningLanguage && (
        <span className='badge badge-outline text-xs flex items-center gap-1'>
          {getLanguageFlag(friend.learningLanguage)}
          <span className='truncate'>Learning: {friend.learningLanguage}</span>
        </span>
      )}
    </div>

    {/* Message Button */}
    <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>
      Message
    </Link>
  </div>
</div>
  )
}

export default FriendCard

export function getLanguageFlag(language){
    if(!language) return null

    const languageLower = language.toLowerCase()
    const countryCode = LANGUAGE_TO_FLAG[languageLower]

    if(countryCode){
        return(
            <img
            className='mr-1 h-3 inline'
            src={`https://flagcdn.com/w40/${countryCode}.png`}
            alt={`${languageLower}flag`}
            />
        )
    }
    return null
}
