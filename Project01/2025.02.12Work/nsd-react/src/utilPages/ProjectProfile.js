import spring from '../images/spring.png';
import react from '../images/react.png';
import java from '../images/java.png';
import mysql from '../images/mysqlworkbench.png';
import javascript from '../images/javascript.png';
import pin from '../images/pin.png';

function ProjectProfile() {
    return (
        <div id='project_profile_box'>
            <h1 style={{ marginTop: '100px' }}>조직도 및 협업 프로젝트&커뮤니티 기능 구현 프로젝트</h1>
            <h2>-팀프로젝트 개요-</h2>
            <br />
            <div className='project_content'>
                <div className='project_content_title'>조직도 및 직원 관리 |&nbsp;</div>
                <div className='project_content_text'>회사의 조직도를 시각적으로 표시하여, 각 부서 및 직원들을 한눈에 볼 수 있습니다.<br />
                    관리자는 부서를 추가 및 삭제 할 수 있으며 직원을 부서에 배치 할 수 있습니다.<br />
                    또한 직원의 추가와 삭제 및 직급을 조정 할 수 있습니다.</div>
            </div><br />
            <div className='project_content'>
                <div className='project_content_title'>프로젝트 협업 및 관리 |&nbsp;</div>
                <div className='project_content_text'>사내에서 현재 진행 중이거나 완료된 프로젝트의 정보를 제공하고 관리 할 수 있습니다.<br />
                    원활한 프로젝트 진행을 위해 이슈 등록하고 확인 할 수 있는 커뮤니티 기능을 제공 합니다.<br />
                    관리자는 프로젝트의 추가, 종료가 가능하며, 각 프로젝트에 참여 하는 인원을 조정 할 수 있습니다.</div>
            </div><br />
            <div className='project_content'>
                <div className='project_content_title'>커뮤니티 게시판 및 관리 |&nbsp;</div>
                <div className='project_content_text'>직원간의 소통이 가능 한 사내 게시판 기능을 이용 할 수 있습니다.<br />
                    글 작성 시 이미지를 첨부 할 수 있고, 메인에서 인기글과 공지글을 확인 할 수 있으며, 각 카테고리 별로 검색 기능을 제공합니다.<br />
                    관리자는 삭제된 글을 복구 하거나 완전한 삭제가 가능 하고, 카테고리를 추가 하거나 인기글의 주기를 변경 할 수 있습니다.</div>
            </div><br />
            <div className='project_content'>
                <h2>-사용 기술-</h2>
            </div><br />
            <div><img src={java} alt="기술" className="project_content_img" />
                <img src={spring} alt="기술" className="project_content_img" />
                <img src={javascript} alt="기술" className="project_content_img" />
                <img src={react} alt="기술" className="project_content_img" />
                <img src={mysql} alt="기술" className="project_content_img" /></div>
            <div id='member_box'>
                <div id='profile1'>
                    <img src={pin} alt="pin" className="pin_img" />
                    <h2 id='tem_name'>팀장: 박현서</h2>
                    <div id='profile_box'>
                        <p><strong>직책 :</strong> 팀장</p>
                        <p><strong>담당 :</strong> CompanyProject(프로젝트 관리)</p>
                        <p><strong>깃 허브 :</strong> </p>
                    </div>
                </div>

                <div id='profile2'>
                    <img src={pin} alt="pin" className="pin_img" />
                    <h2 id='tem_name'>부팀장: 성정민</h2>
                    <div id='profile_box'>
                        <p><strong>직책 :</strong> 부팀장</p>
                        <p><strong>담당 :</strong>  Employee(사원 관리)</p>
                        <p><strong>깃 허브 :</strong> </p>
                    </div>
                </div>

                <div id='profile3'>
                    <img src={pin} alt="pin" className="pin_img" />
                    <h2 id='tem_name'>팀원: 김도겸</h2>
                    <div id='profile_box'>
                        <p><strong>직책 :</strong> 팀원</p>
                        <p><strong>담당 :</strong> CompanyBoard(게시판 관리)</p>
                        <p><strong>깃 허브 :</strong> </p>
                    </div>
                </div>

                <div id='profile4'>
                    <img src={pin} alt="pin" className="pin_img" />
                    <h2 id='tem_name'>팀원: 이수민</h2>
                    <div id='profile_box'>
                        <p><strong>직책 :</strong> 팀원</p>
                        <p><strong>담당 :</strong> CompanyBoard(게시판 관리)</p>
                        <p><strong>깃 허브 :</strong> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProjectProfile;