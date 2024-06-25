const parseResponseData = (data: string) => {
    const sections = data.split('\n\n');
    const elements = sections.map((section, index) => {
        const lines = section.split('\n');
        const heading = lines[0];
        const content = lines.slice(1).join(' ');
        
        return (
            <div key={index} className="mb-5">
                <h3 className="font-semibold">{heading.replace('## ', '').replace('**', '').replace(':**', ':')}</h3>
                <p>{content.replace('**', '').replace('* ', '- ').replace('`', '')}</p>
            </div>
        );
    });
    return elements;
};

export const ResumeTab = ({resume}: any) => {
    return (
        <div>
            {parseResponseData(resume)}
        </div>
    );
};
