#pragma strict

//3/8/2016 version 0.2

public static class Utility
{	
	function HasChildWithTag(parent:GameObject, tag:String)
	{
		var hasChildWithTag:boolean = false;

		for(var child:Transform in parent.transform)
		{
			if(child.tag == tag)
			{
				hasChildWithTag = true;

			}
		}

		return hasChildWithTag;

	}

	function FindDist(obj1:GameObject, obj2:GameObject)
	{
		if(obj1 != null && obj2 != null)
		{
			return(Vector3.Distance(obj1.transform.position, obj2.transform.position));
		}
		else
		{
			Debug.Log("ERROR SCRIPT: 'UtilityScript' FUNCTION: 'FindDist()'");
		}
	}

	function IsNearToObjectWithTag(obj:GameObject, tag:String, extraDetectRadius:float)
	{
		if(obj!= null && tag!=null)
		{
			var isTooClose:boolean = false;

			var objs:GameObject[];
			objs = GameObject.FindGameObjectsWithTag(tag);
			

			for(var i = 0;i<objs.length; i++)
			{
				var dist:float = this.FindDist(objs[i], obj);
				if(dist < (obj.transform.lossyScale.x * extraDetectRadius))
				{
					
					isTooClose = true;
				}
			}

			return isTooClose;
		}
		else
		{
			Debug.Log("ERROR SCRIPT: 'UtilityScript' FUNCTION: 'IsCloseToObjectWithTag()'");
		}
	}

	function FindNearestObjectWithTag(tag:String, object:GameObject)
	{
		var objs:GameObject[];
		objs = GameObject.FindGameObjectsWithTag(tag);

		var closest:int = 100000;
		var closestObject:GameObject;

		var i:int;
		var dist:float;

		for(i = 0;i<objs.length; i++)
		{
			dist = Utility.FindDist(objs[i], object);
			if(dist < (2.5))
			{
				closestObject = objs[i];
			}
		}
		     
		return closestObject;

	}

	function MoveTowards(object:GameObject, target:GameObject, speed:float, rotationSpeed:float)
	{
		object.transform.rotation = Quaternion.Slerp(object.transform.rotation, Quaternion.LookRotation(target.transform.position - object.transform.position), rotationSpeed * Time.deltaTime);
		object.transform.position += object.transform.forward * speed * Time.deltaTime;

	}
}
