describe('DepManagerSpec', function () {
    var a = new DepManager();

    beforeEach(function () {
       a = new DepManager(); 
    });
    
    it("should be able to add", function () {
       a.add('a', 'alpha');
        expect(a.size()).toBe(1);
    });
    
    it("should be able to get", function () {
       a.add('a', 'alpha');
       expect(a.get('a')).toBe('alpha');
    });
    
    it("should be able to delete", function () {
        a.add('a', 'alpha');
        expect(a.get('a')).toBe('alpha');
        a.remove('a');
        a.add('a', undefined);
    });
});