﻿#pragma strict

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

	function IsNearToObjectWithTag(obj:GameObject, tag:String, extraDetectRadius:int)
	{
		if(obj!= null && tag!=null)
		{
			var isTooClose:boolean = false;

			var objs:GameObject[];
			objs = GameObject.FindGameObjectsWithTag(tag);

			extraDetectRadius = 2.5;

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
		//Array storing all the objects with the tag we want
		var objectsWithTag:GameObject[];
		objectsWithTag = GameObject.FindGameObjectsWithTag(tag);

		//The closest object
		var closestObject:GameObject = null;

		var closestObjectIndex:int = 66666;

		var closestDistance:float;

		for(var i = 0;i<objectsWithTag.length; i++)
		{
			var distance = Utility.FindDist(objectsWithTag[i], object);
			if(distance < (closestDistance))
			{
				closestDistance = distance;
				closestObjectIndex = i;
			}
		}
		//In short, another way to check if a object was actually found.
		if(closestObjectIndex <= objectsWithTag.length)
		{
			closestObject = objectsWithTag[closestObjectIndex];
		}
		return closestObject;

	}

	function MoveTowards(object:GameObject, target:GameObject, speed:float, rotationSpeed:float)
	{
		object.transform.rotation = Quaternion.Slerp(object.transform.rotation, Quaternion.LookRotation(target.transform.position - object.transform.position), rotationSpeed * Time.deltaTime);
		object.transform.position += object.transform.forward * speed * Time.deltaTime;

	}
}
