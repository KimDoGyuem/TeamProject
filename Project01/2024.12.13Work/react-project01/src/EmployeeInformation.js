import './App.css';

function EmployeeInformation({name, position, xxx}){
    return(
        <div className={`employee_nformation ${name}`} onClick={xxx}>
            이름:{name}<br/>
            직급(랭크):{position}
        </div>
    );
}

export default EmployeeInformation;