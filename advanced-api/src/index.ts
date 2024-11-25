interface User {
    id: string;
    email: string;
    name: string;
    age: number;
    password: string;
}

type UserProps = Pick<User, 'name' | 'password' | 'age'>;

type UserPropsOptional = Partial<UserProps>;

function callToDatabase(updatedProps: UserPropsOptional) {
    // hit the database 
}

type Employee = {
    name: string;
    age: number;
}

const employee: Readonly<Employee> = {
    name: "dam",
    age: 34,
}

// Readonly example for a api-endpoint
interface Config {
    endpoint: string;
    apiKey: string;
}

const config: Readonly<Config> = {
    endpoint: "https://api.example.com",
    apiKey: 'abcs35452',
}

// Records and maps
interface Records {
    songId: number;
    songname: string;
}

type SingerRecord = Record<string, Records>;

const singer: SingerRecord = {
    'abc': {songId: 143, songname: "hooray"},
    'def': {songId: 567, songname: "murray"},
}

// Maps
interface Records1 {
    id: string;
    age: number;
}

const singer1 = new Map<string, Records1>();

singer1.set('abc123', {
    id: "3432",
    age: 456,
});

singer1.set('edf567', {
    id: "2334",
    age: 67,
})

// Exclude
type MouseEvent1 = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<MouseEvent1, 'scroll'>;

const handleEvent = (event: ExcludeEvent) => {
    console.log(`handling event: ${event}`);
}

handleEvent('click');