
export const classnames = (cls = []) => {
    return cls.join(' ');
}

export const uniq = (function(){
    let i = 0;
    return () => i++;
})();

export const noop = () => false;

export const randomPick = (arr = []) =>  {
    const len = arr.length;
    if (len <= 0) return null;
    return arr[Math.floor(Math.random()*len)];
}