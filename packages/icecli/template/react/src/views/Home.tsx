import BackMap from './CesiumMap'
import DataContent from './DataContent';
function Home() {
    return (<div className='w-full h-full relative'>
        <BackMap></BackMap>
        <DataContent></DataContent>
    </div>);
}

export default Home;