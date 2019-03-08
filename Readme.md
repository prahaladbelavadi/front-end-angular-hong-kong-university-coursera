Reference: https://www.coursera.org/learn/angular

## Learnings: 
- How to iterate through object inside another object
- translate json in TS file to accessing them in html file
- Nesting and importing components
- Still need to understand how the value is being passed from one component to another

----
- Skipping out on angular testing; Need more context before learning why and how to test.

## Setup:
- run `json-server --watch db.json -d 2000`

Bugs:
- `ERROR in src/app/services/leader.service.ts(15,20): error TS2339: Property 'resolve' does not exist on type '<T>(resolver: (resolve: (val: IWhenable<T>) => void, reject: (reason: any) => void, notify: (prog...'.
src/app/services/leader.service.ts(19,20): error TS2339: Property 'resolve' does not exist on type '<T>(resolver: (resolve: (val: IWhenable<T>) => void, reject: (reason: any) => void, notify: (prog...'.
src/app/services/leader.service.ts(23,20): error TS2339: Property 'resolve' does not exist on type '<T>(resolver: (resolve: (val: IWhenable<T>) => void, reject: (reason: any) => void, notify: (prog...'.`

Issues:
- Personal laptop isn't rendering appropriately; The environment is too scattered with older projects, and non sorted untracked inventory.

License: MIT


Reference Code: https://github.com/svlesiv/angular-coursera/

Continue from: https://www.coursera.org/learn/angular/home/week/3
