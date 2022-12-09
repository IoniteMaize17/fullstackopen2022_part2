const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
}

const Total = (props) => {
    let total = props.parts.reduce((partialSum, part) => partialSum + part.exercises, 0);
    return (
        <b>total of {total} exercises</b>
    );
}

export const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
}