import {useState} from 'react';
import './Loading.css';

export default function Loading() {
    const [loading, setLoading] = useState<boolean>(false);
    
    
    return (
        <div className='loading-overlay' data-teste-id="loading">Loading...</div>
    );
}