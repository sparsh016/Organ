import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="https://us.123rf.com/450wm/popcornarts/popcornarts2205/popcornarts220501005/185520641-these-are-black-and-blue-mix-icons.jpg?ver=6"/>
            </div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-teal-400">
                {heading}
            </h2>
            <p className="mt-2 text-center text-md text-teal-100 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-green-500 hover:text-yellow-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}

