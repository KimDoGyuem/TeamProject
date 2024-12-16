import './App.css';

function EmployeeInformation({name, position, xxx}){
    
    let p = '';
    if(position === 1){
        p = '사원';
    }else if(position === 2){
        p = '주임';
    }else if(position === 3){
        p = '대리';
    }else if(position === 4){
        p = '과장';
    }else if(position === 5){
        p = '차장';
    }else if(position === 6){
        p = '부장';
    }else if(position === 7){
        p = '사장';
    }

    return(
        <div className={`employee_information ${name}`} onClick={xxx}>
            <div id='info'>
            이름:{name}<br/>
            직급:{p}
            </div>
        </div>
    );
}

export default EmployeeInformation;