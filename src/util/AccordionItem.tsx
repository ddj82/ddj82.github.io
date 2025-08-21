import {useRef} from 'react';
import {Transition} from "react-transition-group";

// 아코디언 아이템(실제 애니메이션 처리)
interface AccordionItemProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const AccordionItem = ({ isOpen, children }: AccordionItemProps) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    // 애니메이션 지속 시간(ms)
    const duration = 500;

    return (
        <Transition
            in={isOpen}
            timeout={duration}
            nodeRef={nodeRef}
            mountOnEnter
            unmountOnExit
            onEnter={() => {
                // 펼치기 시작할 때 높이를 0으로 설정
                if (nodeRef.current) {
                    nodeRef.current.style.height = '0px';
                }
            }}
            onEntering={() => {
                // 실제 내용 높이만큼 높이를 키워서 애니메이션
                if (nodeRef.current) {
                    nodeRef.current.style.height = nodeRef.current.scrollHeight + 'px';
                }
            }}
            onEntered={() => {
                // 애니메이션이 끝나면 auto로 설정해 내용이 자유롭게 표시되도록
                if (nodeRef.current) {
                    nodeRef.current.style.height = 'auto';
                }
            }}
            onExit={() => {
                // 접기 시작할 때 현재 높이를 고정
                if (nodeRef.current) {
                    nodeRef.current.style.height = nodeRef.current.scrollHeight + 'px';
                }
            }}
            onExiting={() => {
                // 0으로 줄이면서 애니메이션
                if (nodeRef.current) {
                    nodeRef.current.style.height = '0px';
                }
            }}
        >
            {() => (
                <div ref={nodeRef} className="overflow-hidden transition-all duration-300">
                    {children}
                </div>
            )}
        </Transition>
    );
};

export default AccordionItem;
