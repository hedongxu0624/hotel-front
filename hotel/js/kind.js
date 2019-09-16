var service = {
			id:'',
			url:'http://localhost:8080/kind',
				query:function(){
					$('#tb').empty();
					let that = this;
					$.getJSON(that.url+"/query",function(data){
						console.log(data);
						if(data){
							$.each(data,function(i,k){
								$tr = $('<tr></tr>');
								$td1 = $("<td>"+(i+1)+"</td>");
								$td2 = $("<td>"+k.name+"</td>");
								$td3 = $("<td>"+k.icon+"</td>");
								$td4 = $("<td>"+k.info+"</td>");
								$td5 = $("<td class='text-center'></td>");
								$btn1 = $("<button class='btn btn-info btn-sm'>编辑</button>");
								$btn1.click(function(){
									$('#id').val(k.id);
									$('#name').val(k.name);
									$('#icon').val(k.icon);
									$('#info').val(k.info);
								})
								$btn1.appendTo($td5);
								$td6 = $("<td class='text-center'></td>");
								$btn2 = $("<button class='btn btn-danger btn-sm'>删除</button>");
								$btn2.click(function(){
									that.id = k.id;
									$('#dialog').modal('show');
									console.log(that.id);
								})
								$btn2.appendTo($td6);
								$tr.append($td1);
								$tr.append($td2);
								$tr.append($td3);
								$tr.append($td4);
								$tr.append($td5);
								$tr.append($td6);
								$tr.appendTo("#tb")
							})
						}

					})
				},
					remove:function(id){
						let that = this;
						$.get(that.url+"/remove/"+id,function (data) {
							if(data){
								that.id = '';
								that.query();
								$("#dialog .msg").html("<span style='color:green'>客房类型删除成功！</span>");
							}else{
								$("#dialog .msg").html("<span style='color:red'>客房类型删除失败，请重试！</span>");
							}
							setTimeout(function(){
								$("#dialog .msg").html("是否要删除该客房类型？");
								$("#dialog").modal('hide');
							},3000)
						})
					},
				save:function(kind){
					let that = this;

					//判断json中是否为空
						$.post(that.url+"/save", kind, function(data) {
							if (data) {
								that.query();
								that.clear();
							} else {
								$('#msg').text("保存失败，请重试！")
							}
						})	
					
				},
				clear:function(){
					$('#id').val('');
					$('#name').val('');
					$('#icon').val('');
					$('#info').val('');
				}
		}
		$(function(){
			service.query();
			$('#btnsave').click(function(){
				var kind = {
						id:$('#id').val(),
						name:$('#name').val(),
						icon:$('#icon').val(),
						info:$('#info').val()
					}
				service.save(kind);
			})
			$('#btnremove').click(function(){
				service.clear();
			})
			$('#dialog .ok').click(function(){
				service.remove(service.id);
				console.log(service.id)
			})
			
		})