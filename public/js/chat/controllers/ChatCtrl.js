angular.module('chat').controller('ChatCtrl', ['$scope','$timeout', '$window','Io','getUser',
function($scope, $timeout, $window, Io, getUser) {
    var socketio = new Io($scope.socketio, '/chat' );
    getUser.username(function(err, user){
        if (err) {
            $window.location.href = '/accounts/login';
        } else {
            $scope.user = user;
        }
    });
    $scope.messages = [];

    $scope.sendMessage = function(){
        var msg = $scope.msgInput
        if (msg) {
            socketio.emit('message', {user:$scope.user, message:msg});
        };
        $scope.msgInput = null;
    }

    socketio.on('message', function(data) {
        $timeout( function updateMessages(){
            $scope.messages.push(data.user + ' : ' + data.message );
        }, 300)
    })
}
])
